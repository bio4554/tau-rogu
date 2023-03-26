import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import * as Cursor from 'pg-cursor';
import {
  FollowRecord,
  PostRecord,
  RefreshRecord,
  UserProfileRecord,
  UserRecord
} from './models/models';
import config from '../app.config';

interface Database {
  user: UserRecord;
  refresh: RefreshRecord;
  post: PostRecord;
  follow: FollowRecord;
  user_profile: UserProfileRecord;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: config.PostgresServer,
      database: config.PostgresDatabase,
      user: config.PostgresUser,
      password: config.PostgresPassword,
      port: config.PostgresPort
    }),
    cursor: Cursor
  })
});
