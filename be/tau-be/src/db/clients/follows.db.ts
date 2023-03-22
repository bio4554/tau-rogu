import { db } from '../db';
import { FollowRecord } from '../models/models';

export const insert = async (followRecord: FollowRecord) => {
  const result = await db
    .insertInto('follow')
    .values({
      follower: followRecord.follower,
      following: followRecord.following,
      datePosted: followRecord.datePosted
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return result.id;
};

export const getUserFollowers = async (userId: number) => {
  const result = await db
    .selectFrom('follow')
    .select('follow.follower')
    .where('follow.following', '=', userId)
    .execute();

  return result.map((f) => f.follower);
};

export const getUserFollowing = async (userId: number) => {
  const result = await db
    .selectFrom('follow')
    .select('follow.following')
    .where('follow.follower', '=', userId)
    .execute();

  return result.map((f) => f.following as number);
};
