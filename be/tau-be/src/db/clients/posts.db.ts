import { db } from '../db';
import { PostRecord, PostRecordDto, PostRecordType } from '../models/models';

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

  const username = await db
    .selectFrom('user')
    .select(['user.name'])
    .where('user.id', '=', postRecord.userId)
    .executeTakeFirstOrThrow();

  return { postId: result.id, username: username.name };
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

  const idMap = result.map((p) => p.userId);

  if (idMap.length === 0) {
    return [] as PostRecordDto[];
  }

  // todo please fix this query dumbass
  const usernameMap = await db
    .selectFrom('user')
    .select(['name', 'id'])
    .where('user.id', 'in', idMap)
    .execute();

  return result.map(
    (p) =>
      <PostRecordDto>{
        id: p.id,
        title: p.title,
        datePosted: p.datePosted,
        userId: p.userId,
        description: p.description,
        userName: usernameMap.find((u) => p.userId == u.id).name
      }
  );
};
