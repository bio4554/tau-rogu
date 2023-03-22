import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import authRouter from './auth.router';
import postRouter from './post.router';
import userRouter from './user.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);

export default router;
