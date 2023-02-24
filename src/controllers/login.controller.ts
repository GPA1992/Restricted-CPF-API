import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserServices } from '../services';

const jwtConfig: jwt.SignOptions = {
    expiresIn: '999d',
    algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class LoginController {
    public static login = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const user = await UserServices.findByName(name);
            const token = jwt.sign({ ...user }, secret, jwtConfig);
            if (user.role === 'admin') {
                return res.status(200).json({ token });
            }
            return res.status(200).json({ message: `User ${name} logged in` });
        } catch (err: any) {
            return res.status(500).json({
                message: 500,
                error: err.message,
            });
        }
    };
}
