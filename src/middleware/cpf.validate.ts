import { validate } from 'cpf-check';
import { NextFunction, Request, Response } from 'express';
import { CPFService } from '../services';
import { CPFresponse } from '../types/types';

export default class CPFValidate {
    public static CPFBodyFormatValidate = async (req: Request,res: Response,next: NextFunction) => {
        try {
            const { cpf } = req.body;
            const CPFFormatCheck = validate(cpf);
            if (!CPFFormatCheck) {
                return res.status(400).json('InvalidCpfException');
            }
            return next();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
    public static CPFParamsFormatValidate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { cpf } = req.params;
            const CPFFormatCheck = validate(cpf);
            if (!CPFFormatCheck) {
                return res.status(400).json('InvalidCpfException');
            }
            return next();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    public static checkIfCPFExist = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.params;
            const CPFresult: CPFresponse | null = await CPFService.findOneCPF(params.cpf);

            if (CPFresult === null) return res.status(404).json('NotFoundCpfException')

            return next();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    public static checkIfCPFAlreadyExist = async (req: Request, res: Response, next: NextFunction) => { 
        const { cpf } = req.body;      
        const CPFcheck =  await CPFService.findOneCPF(cpf);       
        if (CPFcheck) {
            return res.status(400).json('ExistsCpfException')
        }
        return next();
    };
}
