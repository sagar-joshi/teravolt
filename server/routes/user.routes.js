import { Router } from 'express';
import passport from 'passport';

import * as UserController from '../controllers/user.controller.js';
import * as auth from '../utils/auth.js';

const router = new Router();

router.post('/signup', UserController.userValidation, UserController.createUser);
router.post('/login', passport.authenticate('local'), (req, res) => {res.status(200).send()});
router.post('/logout', auth.logout);
router.get('/getAuthenticatedUser', auth.ensureAuthenticated, UserController.getAuthenticatedUser);

export default router;