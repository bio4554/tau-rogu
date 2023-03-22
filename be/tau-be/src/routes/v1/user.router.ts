import { Router } from 'express';
import * as usersController from '../../controllers/users.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/:userId', auth, usersController.getUser);
router.post('/:userId/follow', auth, usersController.followUser);

export default router;
