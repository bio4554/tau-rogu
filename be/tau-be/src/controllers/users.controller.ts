import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import * as userService from '../services/users.service';

export const getUser = async (req: Request, res: Response) => {
  const token = (req as AuthRequest).token;
  const targetUserId = req.params.userId;

  if (targetUserId === undefined) {
    console.log('userId null');
    res.status(400).send({ message: 'userId null' });
    return;
  }

  const user = await userService.getUser(token.id, parseInt(targetUserId));
  if (user === undefined) {
    console.log('user not following target user for getUser');
    res.status(400).send({ message: 'User not following target user' });
    return;
  }

  res.status(200).send(user);
};

export const followUser = async (req: Request, res: Response) => {
  const token = (req as AuthRequest).token;
  const targetUserId = parseInt(req.params.userId);

  if (targetUserId === undefined) {
    console.log('userid either null or not an int');
    res.status(400).send({ message: 'bad request' });
    return;
  }

  const response = await userService.followUser(token.id, targetUserId);

  if (response === undefined) {
    console.log('failed to follow that user');
    res.status(400).send({ message: 'bad request' });
    return;
  }

  res.status(200).send({ message: 'followed user' });
};
