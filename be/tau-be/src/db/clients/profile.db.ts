import { db } from '../db';
import {
  UserRecord,
  UserProfileRecord,
  UserProfileType
} from '../models/models';

export const insert = async (userProfile: UserProfileRecord) => {
  const result = await db
    .insertInto('user_profile')
    .values({
      userId: userProfile.userId,
      bio: userProfile.bio,
      fullname: userProfile.fullname
    })
    .returning(['id'])
    .executeTakeFirstOrThrow();

  return result;
};

export const firstByUserId = async (
  userId: number
): Promise<UserProfileType> => {
  const result = await db
    .selectFrom('user_profile')
    .selectAll()
    .where('user_profile.userId', '=', userId)
    .executeTakeFirst();

  return result;
};
