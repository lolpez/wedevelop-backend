import { ObjectId } from "mongodb";
export interface IUser {
    _id?: ObjectId
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    enabled?: boolean;
}