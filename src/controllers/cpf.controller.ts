import { Request, Response } from 'express';
import { CPFService } from '../services';
import { ServiceResponse } from '../types/types';

export default class CPFController {
    public static addCPF = async (req: Request, res: Response) => {
        try {
            const { cpf } = req.body;           

            const created = await CPFService.addCPF(cpf);
            if  (created.type) {
                return res.status(created.type).json(created.message);
            }
            return res.status(201).json();
        } catch (error) {
            return res.status(500).json(error.message); 
        }        
    };
    
}