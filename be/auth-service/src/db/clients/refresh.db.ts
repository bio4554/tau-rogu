import { db } from "../db";
import { RefreshRecord } from "../models/models";

export const insert = async (refreshRecord: RefreshRecord) => {
  const result = await db
    .insertInto("refresh")
    .values({ user_id: refreshRecord.user_id, valid: refreshRecord.valid })
    .returning("id")
    .executeTakeFirstOrThrow();

  return result.id;
};

export const firstWithUserId = async (userId: number) => {
  const result = await db
    .selectFrom("refresh")
    .selectAll()
    .where("refresh.user_id", "=", userId)
    .executeTakeFirst();

  return result;
};
