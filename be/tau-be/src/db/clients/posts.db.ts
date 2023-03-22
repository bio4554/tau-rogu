import { db } from '../db';
import { PostRecord, PostRecordType } from '../models/models';

export const insert = async (postRecord: PostRecord) => {
  const result = await db
    .insertInto('post')
    .values({
      title: postRecord.title,
      userId: postRecord.userId,
      datePosted: postRecord.datePosted,
      description: postRecord.description
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return result.id;
};

export const getUserPosts = async (userId: number) => {
  const result = await db
    .selectFrom('post')
    .selectAll()
    .where('post.userId', '=', userId)
    .execute();

  return result;
};

export const firstWithId = async (id: number) => {
  const result = await db
    .selectFrom('post')
    .selectAll()
    .where('post.id', '=', id)
    .executeTakeFirst();

  return result;
};

export const getFeedFromUsers = async (users: number[]) => {
  const result = await db
    .selectFrom('post')
    .selectAll()
    .where('post.userId', 'in', users)
    .orderBy('post.datePosted', 'desc')
    .limit(10)
    .execute();

  return result.map(
    (p) =>
      <PostRecordType>{
        id: p.id,
        title: p.title,
        datePosted: p.datePosted,
        userId: p.userId,
        description: p.description
      }
  );
};
