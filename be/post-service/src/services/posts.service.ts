import * as postsDbClient from "../db/clients/posts.db";
import { PostRecord } from "../db/models/models";

export const createPost = async (postRecord: PostRecord) => {
  const result = await postsDbClient.insert(postRecord);
  return result;
};