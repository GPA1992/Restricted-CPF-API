import express from 'express';
import { CPFController } from '../controllers';
import CPFValidate from '../middleware/cpf.validate';
import AuthMiddleware from '../auth/auth';

const router = express.Router();

router.get(
    '/:cpf',
    CPFValidate.CPFParamsFormatValidate,
    CPFValidate.checkIfCPFExist,
    CPFController.findOneCPFOnRestrictedList
);

router.get('/', CPFController.findAllCPFOnRestrictedList);

router.post(
    '/',
    AuthMiddleware.tokenHandle,
    CPFValidate.CPFBodyFormatValidate,
    CPFValidate.checkIfCPFAlreadyExist,
    CPFController.addCPFToRestrictedList
);

router.delete(
    '/:cpf',
    AuthMiddleware.tokenHandle,
    CPFValidate.CPFParamsFormatValidate,
    CPFValidate.checkIfCPFExist,
    CPFController.deleteCPFOnRestrictedList
);

export default router;
