import { Router, Request, Response } from 'express';
import { IChat, IMessage, messageCollection } from '../models';
import { ObjectId } from "mongodb";

const router = Router();

router.post('/', async  (req: Request, res: Response) => {
    try {
        const { senderUserId, recipientUserId, text } = req.body;
        const query = { 
            participants: {
                $all: [
                    new ObjectId(senderUserId?.toString()),
                    new ObjectId(recipientUserId?.toString())
                ]
            }, 
        };
        const message : IMessage ={
            _id: new ObjectId(),
            senderUserId,
            text,
            dateTime: new Date()
        }
        const chat = (await messageCollection.findOne(query)) as unknown as IChat;
        let result;
        if (chat) {
            result = await messageCollection.updateOne(
                {
                    participants: {
                        $all: [
                            new ObjectId(senderUserId), new ObjectId(recipientUserId)
                        ]
                    }
                },
                {
                    $push: { messages: message },
                }
            );
        } else {
            const newMessage: IChat = {
                participants: [new ObjectId(senderUserId), new ObjectId(recipientUserId)],
                messages: [message]
            }
            result = await messageCollection.insertOne(newMessage);
        }
        result
            ? res.status(201).json(result)
            : res.status(500).send("Failed to create a new message.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

/*router.get("/", async (req: Request, res: Response) => {
    try {
       const users = (await messageCollection.find({}).toArray()) as unknown as IMessage[];
       res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});*/

router.get("/", async (req: Request, res: Response) => {
    try {
        const { senderUserId, recipientUserId } = req.query;
        const query = { 
            participants: {
                $all: [
                    new ObjectId(senderUserId?.toString()),
                    new ObjectId(recipientUserId?.toString())
                ]
            }, 
        };
        const messages = (await messageCollection.findOne(query)) as unknown as IChat;
        res.status(200).send(messages);
    } catch (error) {
        res.status(404).send(`Unable to find messages from user with id: ${req.params.id}`);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await messageCollection.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed message with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove message with id: ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Message with id: ${id} does not exist`);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export { router as messageRouter };