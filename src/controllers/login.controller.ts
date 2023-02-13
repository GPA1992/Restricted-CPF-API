import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services';

const jwtConfig : jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class Login {
  public static login = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const user = await UserService.findByName(name);
      const token = jwt.sign({ ...user }, secret, jwtConfig);
      
      return res.status(200).json({ token }); 

    } catch (err: any) {
      return res.status(500).json({
        message: 500, error: err.message });
    }
  };
}
