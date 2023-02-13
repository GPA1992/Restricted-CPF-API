import { Request, Response } from 'express';
import { CPFService } from '../services';
import { CPFresponse } from '../types/types';

export default class CPFController {
    public static addCPFToRestrictedList = async (req: Request, res: Response) => {
        try {
            const { cpf } = req.body;

            await CPFService.addCPF(cpf);

            return res.status(201).json();
        } catch (error) {
            console.log('contoller');
            return res.status(500).json(error.message);
        }
    };

    public static findOneCPFOnRestrictedList = async (req: Request, res: Response) => {
        try {
            const params = req.params;

            const CPFresult = await CPFService.findOneCPF(params.cpf);

           return res.status(200).json(CPFresult);
        } catch (error) {
            console.log('contoller');
            return res.status(500).json(error.message);
        }
    };

    public static findAllCPFOnRestrictedList = async (req: Request, res: Response) => {
        try {
            const CPFresult = await CPFService.findAllCPF();

            return res.status(200).json(CPFresult);
        } catch (error) {
            console.log('contoller');
            return res.status(500).json(error.message);
        }
    };

    public static deleteCPFOnRestrictedList = async (req: Request, res: Response) => {
        try {
            const params = req.params;

            const CPFresult = await CPFService.deleteCPF(params.cpf);

            return res.status(200).json({cpd: CPFresult.cpf, createdAt: CPFresult.createdAt });
        } catch (error) {
            console.log('contoller');
            return res.status(500).json(error.message);
        }
    };
}
