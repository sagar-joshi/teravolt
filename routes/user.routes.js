import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = new Router();

router.post('/signup',UserController.userValidation, UserController.createUser);

export default router;