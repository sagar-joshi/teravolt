import { Router } from 'express';

import * as GroupController from '../controllers/group.controller.js';
import { ensureAuthenticated } from '../utils/auth.js';

const router = new Router();

router.post('/create', ensureAuthenticated, GroupController.createGroup);
router.post('/addMember', ensureAuthenticated, GroupController.addMember);
router.post('/getByGroupId', ensureAuthenticated, GroupController.getGroupByGroupId)

export default router;