import { NextFunction, Request, Response } from 'express';
import { PostRecord, PostRecordDto, PostRecordType } from '../db/models/models';
import { AuthRequest } from '../middleware/auth';
import * as postService from '../services/posts.service';

export const create = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      console.log('title or desc was null');
      res.status(400).send({
        message: 'Title or description was null'
      });
      return;
    }

    const token = (req as AuthRequest).token;

    const postRecord: PostRecord = {
      title: title,
      description: description,
      datePosted: new Date().toISOString(),
      userId: token.id,
      isDeleted: true
    };

    const result = await postService.createPost(postRecord);

    const response: PostRecordDto = {
      id: result.postId,
      title: postRecord.title,
      description: postRecord.description,
      datePosted: postRecord.datePosted,
      userId: postRecord.userId,
      userName: result.username,
      isDeleted: true
    };

    res.status(201).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Check the log for details'
    });
  }
};

export const getUploadUrl = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    if (postId === undefined) {
      console.log('postId was null');
      res.status(400).send({ message: 'bad request' });
      return;
    }

    const token = (req as AuthRequest).token;

    const uploadUrl = await postService.getUploadUrl(postId, token.id);
    if (uploadUrl === undefined) {
      console.log('uploadUrl was undefined');
      res.status(400).send({ message: 'bad request' });
      return;
    }
    res.status(200).send({ uploadUrl: uploadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Check the log for details' });
  }
};

export const postUploadCallback = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    if (postId === undefined) {
      console.log('postId was null');
      res.status(400).send({ message: 'bad request' });
      return;
    }

    const token = (req as AuthRequest).token;

    const uploaded = await postService.postUploadCallback(postId);
    if (uploaded === false) {
      console.log('callback returned false');
      res.status(400).send({ message: 'bad request' });
      return;
    }
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Check the log for details' });
  }
};

export const userPosts = async (req: Request, res: Response) => {
  try {
    const token = (req as AuthRequest).token;

    const userId = req.params.userId;

    const posts = await postService.getUserPosts(parseInt(userId));

    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Check the log for details'
    });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    const token = (req as AuthRequest).token;
    const userId = parseInt(token.id);

    const posts = await postService.getUserFeed(userId);

    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'Check the log for details'
    });
  }
};
