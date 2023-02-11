import express from 'express';
import * as visitorController from '../database/controllers/visitor.controller';

const router = express.Router();


// R -> READ
router.get('/', visitorController.getAll);


// C -> CREATE
router.post('/', visitorController.create);

// R -> READ.. But by ID
router.get('/:visitorID');

// U -> UPDATE
router.put('/:visitorID');

// D -> DELETE
router.put('/:visitorID');

export default router;
