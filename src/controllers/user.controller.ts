import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { UserServices } from '../services';

export default class UserController {
    public static addNewUser = async (req: Request, res: Response) => {
        try {
            const { body } = req;

            const salt = bcrypt.genSaltSync(10);

            const hash = bcrypt.hashSync(body.password, salt);

            const newUser = {
                name: body.name,
                role: body.role,
                password: hash,
            };

            await UserServices.addNewUser(newUser);

            return res.status(201).json({ message: `User ${body.name} successfully created` });
        } catch (err: any) {
            return res.status(500).json({
                message: 500,
                error: err.message,
            });
        }
    };
}
