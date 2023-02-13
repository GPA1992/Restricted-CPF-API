import express from 'express';
import LoginController from '../controllers/login.controller';
import UserValidate from '../middleware/user.validate';

const router = express.Router();

router.post(
    '/',
    UserValidate.loginFieldHandle,
    UserValidate.fieldValidate,
    LoginController.login
);

export default router;
