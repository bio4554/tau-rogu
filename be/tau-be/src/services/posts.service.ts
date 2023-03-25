import * as postsDbClient from '../db/clients/posts.db';
import * as followDbClient from '../db/clients/follows.db';
import * as blobClient from '../db/blob/blob.client';
import { PostRecord, PostRecordType } from '../db/models/models';

export const createPost = async (postRecord: PostRecord) => {
  const result = await postsDbClient.insert(postRecord);
  await blobClient.uploadObject();
  return result;
};

export const getUserPosts = async (userId: number) => {
  const result = await postsDbClient.getUserPosts(userId);
  return result;
};

export const getUserFeed = async (userId: number) => {
  const following = await followDbClient.getUserFollowing(userId);

  if (following === undefined || following.length === 0) {
    return [] as PostRecordType[];
  }

  const feed = await postsDbClient.getFeedFromUsers(following);

  return feed;
};
