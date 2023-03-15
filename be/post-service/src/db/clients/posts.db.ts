import { db } from "../db";
import { PostRecord } from "../models/models";

export const insert = async (postRecord: PostRecord) => {
  const result = await db
    .insertInto("posts")
    .values({
      title: postRecord.title,
      userId: postRecord.userId,
      datePosted: postRecord.datePosted,
      description: postRecord.description,
    })
    .returning("id")
    .executeTakeFirstOrThrow();

  return result.id;
};

export const getUserPosts = async (userId: number) => {
  const result = await db
    .selectFrom("posts")
    .selectAll()
    .where("posts.userId", "=", userId)
    .execute();

  return result;
};

export const firstWithId = async (id: number) => {
  const result = await db
    .selectFrom("posts")
    .selectAll()
    .where("posts.id", "=", id)
    .executeTakeFirst();

  return result;
};
