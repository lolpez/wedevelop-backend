import { Router, Request, Response } from 'express';
import { IUser, userCollection } from '../models';
import { ObjectId } from "mongodb";

const router = Router();

router.post('/', async  (req: Request, res: Response) => {
    try {
        const { firstName, lastName, userName, password } = req.body;
        const newUser: IUser = {
            firstName,
            lastName,
            userName,
            password,
            enabled: true
        };
        const result = await userCollection.insertOne(newUser);
        result
            ? res.status(201).json(result)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
       const users = (await userCollection.find({}).toArray()) as unknown as IUser[];
       res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id?.toString()) };
        const result = await userCollection.findOne(query);
        result
            ? res.status(200).json(result)
            : res.status(500).send("User does not exist.");
    } catch (error) {
        res.status(400).send(error);
    }
});

export { router as userRouter };