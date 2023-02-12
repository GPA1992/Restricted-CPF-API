import { validate } from 'cpf-check';
import { NextFunction, Request, Response } from 'express';

export default class CPFValidate {
    public static CPFBodyFormatValidate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
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
    public static CPFParamsFormatValidate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
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
}
