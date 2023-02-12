import { Request, Response } from 'express';
import { CPFService } from '../services';
import { CPFresponse } from '../types/types';

export default class CPFController {
    public static addCPF = async (req: Request, res: Response) => {
        try {
            const { cpf } = req.body;

            const created = await CPFService.addCPF(cpf);
            if (created.type) {
                return res.status(created.type).json(created.message);
            }
            return res.status(201).json();
        } catch (error) {
            console.log('contoller');
            return res.status(500).json(error.message);
        }
    };

    public static findOneCPF = async (req: Request, res: Response) => {
        try {
            const params = req.params;
            const CPFresult: CPFresponse | null = await CPFService.findOneCPF(params.cpf);
            if (CPFresult === null) {
                return res.status(404).json('NotFoundCpfException');
            }
            return res.status(200).json({cpd: CPFresult.cpf, createdAt: CPFresult.createdAt });
        } catch (error) {
            console.log('contoller');
            return res.status(500).json(error.message);
        }
    };
}
