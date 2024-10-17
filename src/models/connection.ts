import { Collection, MongoClient, Db } from "mongodb";
import { IChat, IUser } from "../models";
import * as dotenv from "dotenv";

export let userCollection: Collection<IUser>;
export let messageCollection: Collection<IChat>;

export async function connectToDatabase () {
    dotenv.config();
    const client = new MongoClient("mongodb+srv://lolpez:MZ6uFB8plUAYtXq4@cluster0.utltj.mongodb.net/");
    await client.connect();
    const database: Db = client.db("we_develop");
    userCollection = database.collection("users");
    messageCollection = database.collection("messages");
    console.log(`Successfully connected to database: ${database.databaseName}`);
}
