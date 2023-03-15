import * as usersDbClient from "../db/clients/users.db";
import { UserRecord } from "../db/models/models";

export const createNewUser = async (username: string, password: string) => {
  const id = await usersDbClient.insert({ name: username, password: password });
  return { name: username, password: password, id: id };
};
