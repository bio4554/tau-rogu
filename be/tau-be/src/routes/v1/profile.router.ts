import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import { auth } from '../../middleware/auth';

const router = Router();
router.get('/:userId', auth, usersController.getProfile);

export default router;
