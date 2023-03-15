import { db } from "../db";
import { UserRecord } from "../models/models";

export const insert = async (userRecord: UserRecord) => {
  const result = await db
    .insertInto("users")
    .values({ name: userRecord.name, password: userRecord.password })
    .returning("id")
    .executeTakeFirstOrThrow();

  return result.id;
};
