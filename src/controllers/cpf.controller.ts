import { Request, Response } from 'express';
import { CPFServices } from '../services';

export default class CPFController {
    public static addCPFToRestrictedList = async (req: Request, res: Response) => {
        try {
            const { cpf } = req.body;

            await CPFServices.addCPF(cpf);

            return res.status(201).json();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    public static findOneCPFOnRestrictedList = async (req: Request, res: Response) => {
        try {
            const params = req.params;

            const CPFresult = await CPFServices.findOneCPF(params.cpf);

            return res.status(200).json(CPFresult);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    public static findAllCPFOnRestrictedList = async (req: Request, res: Response) => {
        try {
            const CPFresult = await CPFServices.findAllCPF();

            return res.status(200).json(CPFresult);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    public static deleteCPFOnRestrictedList = async (req: Request, res: Response) => {
        try {
            const params = req.params;
            await CPFServices.deleteCPF(params.cpf);
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}
