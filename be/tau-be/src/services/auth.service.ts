import * as usersDbClient from '../db/clients/users.db';
import * as refreshDbClient from '../db/clients/refresh.db';
import { RefreshRecord, UserRecord } from '../db/models/models';
import bcrypt from 'bcrypt';

export const createNewUser = async (username: string, password: string) => {
  // check if user exists
  const nameUsed = (await usersDbClient.firstWithName(username)) != undefined;
  if (nameUsed) {
    return undefined;
  }
  password = await hashPassword(password);
  const id = await usersDbClient.insert({
    name: username,
    password: password
  });
  return {
    name: username,
    password: password,
    id: id
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

export const getUser = async (userId: number) => {
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
