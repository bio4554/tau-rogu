import * as usersDbClient from '../db/clients/users.db';
import * as followsDbClient from '../db/clients/follows.db';

export const getUser = async (userId: number, targetUserId: number) => {
  // get all following
  const following = await followsDbClient.getUserFollowing(userId);
  if (following.includes(targetUserId)) {
    const result = await usersDbClient.firstWithId(userId);
    return result;
  }
  return undefined;
};
