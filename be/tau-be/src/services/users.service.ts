import * as usersDbClient from '../db/clients/users.db';
import * as followsDbClient from '../db/clients/follows.db';
import { FollowRecord } from '../db/models/models';

export const getUser = async (userId: number, targetUserId: number) => {
  // get all following
  const following = await followsDbClient.getUserFollowing(userId);
  if (following.includes(targetUserId)) {
    const result = await usersDbClient.firstWithId(userId);
    return result;
  }
  return undefined;
};

export const getSingleUser = async (userId: number) => {
  const result = await usersDbClient.firstWithId(userId);
  return result;
};

export const followUser = async (userId: number, targetUserId: number) => {
  // validate user exists
  const targetUser = await usersDbClient.firstWithId(targetUserId);
  if (targetUser === undefined) return undefined;
  const followRecord: FollowRecord = {
    following: targetUserId,
    follower: userId,
    datePosted: Date.now()
  };

  const response = await followsDbClient.insert(followRecord);
  return response;
};
