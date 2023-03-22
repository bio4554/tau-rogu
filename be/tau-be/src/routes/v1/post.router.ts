import { Router } from 'express';
import * as postsController from '../../controllers/posts.controller';
import { auth } from '../../middleware/auth';

const router = Router();

router.post('/', auth, postsController.create);
router.get('/feed', auth, postsController.getFeed);
router.get('/users/:userId', auth, postsController.userPosts);

export default router;
