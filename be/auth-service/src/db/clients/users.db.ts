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

export const firstWithName = async (username: string) => {
  const result = await db
    .selectFrom("users")
    .selectAll()
    .where("users.name", "=", username)
    .executeTakeFirst();

  return result;
};

export const firstWithId = async (id: number) => {
  const result = await db
    .selectFrom("users")
    .select(["users.id", "users.name"])
    .where("users.id", "=", id)
    .executeTakeFirst();

  return result;
};
