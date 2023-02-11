import { Request, Response } from 'express';
import * as visitorService from '../services/visitor.service';

export const create = async (req: Request, res: Response) => {
    try {
        const visitor = req.body;
        const create = await visitorService.visitorCreate(visitor);
        return res.status(201).json(create);
    } catch (err: any) {
        return res.status(500).json({
            message: 500,
            error: err.message,
        });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const visitors = await visitorService.getAll();        
        return res.status(200).json(visitors);
    } catch (err: any) {
        return res.status(500).json({
            message: 500,
            error: err.message,
        });
    }
};
