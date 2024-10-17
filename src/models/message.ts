import { ObjectId } from "mongodb";
export interface IChat {
    _id?: ObjectId;
    participants: ObjectId[];
    messages: IMessage[];
}

export interface IMessage {
    _id?: ObjectId;
    senderUserId: ObjectId;
    dateTime: Date;
    text: string;
}