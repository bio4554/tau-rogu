import { NextFunction, Request, Response } from "express";
import { PostRecord, PostRecordType } from "../db/models/models";
import { AuthRequest } from "../middleware/auth";
import * as postService from "../services/posts.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      console.log("title or desc was null");
      res.status(400).send({ message: "Title or description was null" });
      return;
    }

    const token = (req as AuthRequest).token;

    const postRecord: PostRecord = {
      title: title,
      description: description,
      datePosted: Date.now(),
      userId: token.id,
    };

    const result = await postService.createPost(postRecord);

    const response: PostRecordType = {
      id: result,
      title: postRecord.title,
      description: postRecord.description,
      datePosted: postRecord.datePosted,
      userId: postRecord.userId,
    };

    res.status(201).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Check the log for details" });
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
    res.status(500).send({ message: "Check the log for details" });
  }
};
