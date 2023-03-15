import * as usersDbClient from "../db/clients/users.db";
import { UserRecord } from "../db/models/models";
import bcrypt from "bcrypt";

export const createNewUser = async (username: string, password: string) => {
  // check if user exists
  const nameUsed = (await usersDbClient.firstWithName(username)) != undefined;
  if (nameUsed) {
    return undefined;
  }
  password = await hashPassword(password);
  const id = await usersDbClient.insert({ name: username, password: password });
  return { name: username, password: password, id: id };
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

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

const checkPassword = async (hashedPassword: string, password: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
