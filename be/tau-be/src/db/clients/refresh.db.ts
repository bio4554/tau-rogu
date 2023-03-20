import { db } from "../db";
import { RefreshRecord } from "../models/models";

export const insert = async (refreshRecord: RefreshRecord) => {
  const result = await db
    .insertInto("refresh")
    .values({
      user_id: refreshRecord.user_id,
      valid: refreshRecord.valid,
      dateCreated: refreshRecord.dateCreated,
    })
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

export const firstWithId = async (id: number) => {
  const result = await db
    .selectFrom("refresh")
    .selectAll()
    .where("refresh.id", "=", id)
    .executeTakeFirst();

  return result;
};

export const updateById = async (refreshRecord: RefreshRecord) => {
  if (!refreshRecord.id) return undefined;
  const result = await db
    .updateTable("refresh")
    .set({
      user_id: refreshRecord.user_id,
      valid: refreshRecord.valid,
      dateCreated: refreshRecord.dateCreated,
    })
    .where("refresh.id", "=", refreshRecord.id.__select__)
    .executeTakeFirst();

  return result;
};

export const invalidateAll = async (userId: number) => {
  const result = await db
    .updateTable("refresh")
    .set({ valid: false })
    .where("user_id", "=", userId)
    .where("refresh.valid", "=", true)
    .executeTakeFirst();
  return result;
};
