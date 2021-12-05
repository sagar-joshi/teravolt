import { Router } from 'express';

import * as MessageController from '../controllers/message.controller.js';
import { ensureAuthenticated } from '../utils/auth.js';

const router = new Router();

router.post('/send', ensureAuthenticated, MessageController.sendMessage);

export default router;