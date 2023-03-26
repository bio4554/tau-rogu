import * as usersDbClient from '../db/clients/users.db';
import * as refreshDbClient from '../db/clients/refresh.db';
import * as profilesDbClient from '../db/clients/profile.db';
import { RefreshRecord, UserRecord, UserRecordType } from '../db/models/models';
import bcrypt from 'bcrypt';

export const createNewUser = async (username: string, password: string) => {
  // check if user exists
  const nameUsed = (await usersDbClient.firstWithName(username)) != undefined;
  if (nameUsed) {
    return undefined;
  }
  password = await hashPassword(password);
  const result = await usersDbClient.insert({
    name: username,
    password: password,
    joinedDate: Date.now()
  });

  // create empty profile for later
  const profileResult = await profilesDbClient.insert({
    userId: result.id,
    bio: '',
    fullname: username
  });

  return {
    name: username,
    password: password,
    id: result.id,
    joinedDate: result.joinedDate
  };
};

export const loginUser = async (username: string, password: string) => {
  const user = await usersDbClient.firstWithName(username);
  if (!user) {
    return undefined;
  }
  const valid = await checkPassword(user.password, password);
  if (valid) {
    user.password = undefined;
    return user;
  }
  return undefined;
};

export const getUser = async (userId: number): Promise<UserRecordType> => {
  const result = await usersDbClient.firstWithId(userId);
  return result;
};

export const getRefresh = async (id: number) => {
  const result = await refreshDbClient.firstWithId(id);
  return result;
};

export const invalidateRefresh = async (id: number) => {
  const result = await refreshDbClient.invalidateAll(id);
  return result;
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

const checkPassword = async (hashedPassword: string, password: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
