import { db } from "../db";
import { PostRecord } from "../models/models";

export const insert = async (postRecord: PostRecord) => {
  const result = await db
    .insertInto("posts")
    .values({
      title: postRecord.title,
      userId: postRecord.userId,
      datePosted: Date.now(),
      description: postRecord.description,
    })
    .returning("id")
    .executeTakeFirstOrThrow();

  return result.id;
};
