import { Router } from 'express';

import * as GroupController from '../controllers/group.controller.js';
import { ensureAuthenticated } from '../utils/auth.js';

const router = new Router();

router.post('/create', ensureAuthenticated, GroupController.createGroup);
router.post('/addMember', ensureAuthenticated, GroupController.addMember);
router.post('/removeMember', ensureAuthenticated, GroupController.removeMember);
router.post('/getByGroupId', ensureAuthenticated, GroupController.getGroupByGroupId)
router.post('/getByUserId', ensureAuthenticated, GroupController.getUserGroups);
router.post('/getGroups',ensureAuthenticated, GroupController.getAllGroups);

export default router;