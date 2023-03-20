import { db } from "../db";
import { UserRecord } from "../models/models";

export const insert = async (userRecord: UserRecord) => {
  const result = await db
    .insertInto("user")
    .values({ name: userRecord.name, password: userRecord.password })
    .returning("id")
    .executeTakeFirstOrThrow();

  return result.id;
};

export const firstWithName = async (username: string) => {
  const result = await db
    .selectFrom("user")
    .selectAll()
    .where("user.name", "=", username)
    .executeTakeFirst();

  return result;
};

export const firstWithId = async (id: number) => {
  const result = await db
    .selectFrom("user")
    .select(["user.id", "user.name"])
    .where("user.id", "=", id)
    .executeTakeFirst();

  return result;
};
