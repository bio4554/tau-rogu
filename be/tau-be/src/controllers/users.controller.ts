import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import * as userService from '../services/users.service';

export const getUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Check the log for more details' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const targetUserId = req.params.userId;

    if (targetUserId === undefined) {
      console.error('userId null');
      res.status(400).send({ message: 'userId null' });
      return;
    }

    const profile = await userService.getUserProfile(parseInt(targetUserId));
    if (profile === undefined) {
      console.error('profile undefined');
      res.status(404).send({ message: 'undefined' });
      return;
    }

    res.status(200).send(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Check the log for more details' });
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const token = (req as AuthRequest).token;
    const targetUserId = token.id;

    if (targetUserId === undefined) {
      console.log('userId null');
      res.status(400).send({ message: 'userId null' });
      return;
    }

    const user = await userService.getSingleUser(token.id);
    if (user === undefined) {
      console.log('user not following target user for getUser');
      res.status(400).send({ message: 'User not following target user' });
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Check the log for more details' });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Check the log for more details' });
  }
};

export const searchByName = async (req: Request, res: Response) => {
  try {
    const targetName = req.query.username as string;

    if (targetName === undefined) {
      console.log('targetName was null when searching');
      res.status(400).send({ message: 'bad request' });
      return;
    }

    const result = await userService.searchByName(targetName);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'check the log for details' });
  }
};
