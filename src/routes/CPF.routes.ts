import express from 'express';
import CPFController from '../controllers/cpf.controller';
import CPFValidate from '../middleware/cpfFormatValidate';

const router = express.Router();

// R -> READ
router.get(
    '/:cpf',
    CPFValidate.CPFParamsFormatValidate,
    CPFController.findOneCPF
);

// C -> CREATE
router.post('/', CPFValidate.CPFBodyFormatValidate, CPFController.addCPF);

/* // R -> READ.. But by ID
router.get('/:visitorID');

// U -> UPDATE
router.put('/:visitorID');

// D -> DELETE
router.put('/:visitorID'); */

export default router;
