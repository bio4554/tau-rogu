import * as usersDbClient from '../db/clients/users.db';
import * as followsDbClient from '../db/clients/follows.db';
import * as profilesDbClient from '../db/clients/profile.db';
import { FollowRecord } from '../db/models/models';

export const getUser = async (userId: number, targetUserId: number) => {
  // get all following and include current user
  const following = [
    ...(await followsDbClient.getUserFollowing(userId)),
    userId
  ];
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

export const getUserProfile = async (userId: number) => {
  const user = await usersDbClient.firstWithId(userId);

  if (user === undefined) return undefined;

  const profile = await profilesDbClient.firstByUserId(userId);

  if (profile === undefined) return undefined;

  return { profile: profile, user: user };
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

export const searchByName = async (username: string) => {
  const result = await usersDbClient.searchByName(username, 30);
  return result;
};
