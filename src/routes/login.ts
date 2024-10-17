import { Router, Request, Response } from 'express';
import { IUser, userCollection } from '../models';
import { sign } from 'jsonwebtoken';

const accessTokenSecret = 'youraccesstokensecret';

const router = Router();

router.post('/', async  (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        const query = { userName: userName, password: password };
        const user = (await userCollection.findOne(query)) as unknown as IUser;
        console.log(user)
        if (user) {
            const accessToken = sign({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
            }, accessTokenSecret, { expiresIn : 60 });
            res.json({accessToken});
        } else {
            res.status(401).send('Incorrect username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

export { router as loginRouter };