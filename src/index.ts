import express, { Request, Response } from 'express';
import { loginRouter, userRouter, messageRouter } from './routes';
import { connectToDatabase } from "./models/connection";
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3001;

connectToDatabase().then(() => {
    app.use(express.json());
    app.use(cors());
    app.use('/login', loginRouter);
    app.use('/user', userRouter);
    app.use('/message', messageRouter);

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, TypeScript Express!');
    });

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}).catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});
