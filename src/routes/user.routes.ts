import express from 'express';
import UserController from '../controllers/user.controller';
import UserValidate from '../middleware/user.validate'

const router = express.Router();

router.post('/', UserValidate.createUserfieldHandle, UserController.addNewUser);



export default router;
