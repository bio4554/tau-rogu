import * as postsDbClient from '../db/clients/posts.db';
import * as followDbClient from '../db/clients/follows.db';
import * as blobClient from '../db/blob/blob.client';
import { PostRecord, PostRecordType } from '../db/models/models';

export const createPost = async (postRecord: PostRecord) => {
  const result = await postsDbClient.insert(postRecord);
  //await blobClient.uploadObject();
  return result;
};

export const getUserPosts = async (userId: number) => {
  const result = await postsDbClient.getUserPosts(userId);

  for await (const post of result) {
    post.imageUrl = await blobClient.getDownloadUrl(post.imageUrl);
  }

  return result;
};

export const getUserFeed = async (userId: number) => {
  let following = await followDbClient.getUserFollowing(userId);

  following = [...following, userId];

  if (following === undefined || following.length === 0) {
    return [] as PostRecordType[];
  }

  const feed = await postsDbClient.getFeedFromUsers(following);

  for await (const post of feed) {
    post.imageUrl = await blobClient.getDownloadUrl(post.imageUrl);
  }

  return feed;
};

export const getUploadUrl = async (forPost: number, byUser: number) => {
  // verify post exists
  const postResult = await postsDbClient.firstWithId(forPost, true);
  if (
    postResult === undefined ||
    postResult.imageUrl !== null ||
    postResult.userId !== byUser
  ) {
    return undefined;
  }
  const uploadUrl = await blobClient.getUploadUrl();
  if (uploadUrl === undefined) return undefined;
  postResult.imageUrl = uploadUrl.key;
  await postsDbClient.putPost(postResult);
  return uploadUrl.url;
};

// validate that image was uploaded and mark post as visible
export const postUploadCallback = async (forPost: number) => {
  // verify post exists
  const postResult = await postsDbClient.firstWithId(forPost, true);
  if (postResult === undefined) return false;
  const blobExists = await blobClient.blobExists(postResult.imageUrl);
  if (!blobExists) return false;
  postResult.isDeleted = false;
  await postsDbClient.putPost(postResult);
  return true;
};
