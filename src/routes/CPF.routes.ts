import express from 'express';
import CPFController from '../controllers/cpf.controller';

const router = express.Router();


// R -> READ
/* router.get('/', visitorController.getAll); */


// C -> CREATE
router.post('/', CPFController.addCPF);

/* // R -> READ.. But by ID
router.get('/:visitorID');

// U -> UPDATE
router.put('/:visitorID');

// D -> DELETE
router.put('/:visitorID'); */

export default router;
