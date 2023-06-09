import { Generated } from 'kysely';

export interface UserRecord {
  id?: Generated<number>;
  name: string;
  password: string;
  joinedDate: number;
}

export type UserRecordType = {
  id?: number;
  name: string;
  password?: string;
  joinedDate: number;
};

export interface RefreshRecord {
  id?: Generated<number>;
  user_id: number;
  valid: boolean;
  dateCreated: number;
}

export type RefreshRecordType = {
  id?: number;
  user_id: number;
  valid: boolean;
  dateCreated: number;
};

export interface PostRecord {
  id?: Generated<number>;
  title: string;
  userId: number;
  datePosted: string;
  description: string;
  isDeleted: boolean;
  imageUrl?: string;
}

export type PostRecordType = {
  id?: number;
  title: string;
  userId: number;
  datePosted: string; // todo something weird going on here with unix epoch time overflowing the number buffer
  description: string;
  isDeleted: boolean;
  imageUrl?: string;
};

export type PostRecordDto = {
  id?: number;
  title: string;
  userId: number;
  userName: string;
  datePosted: string;
  description: string;
  isDeleted: boolean;
  imageUrl?: string;
};

export interface FollowRecord {
  id?: Generated<number>;
  following: number;
  follower: number;
  datePosted: number;
}

export type FollowRecordType = {
  id?: number;
  following: number;
  follower: number;
  datePosted: number;
};

export interface UserProfileRecord {
  id?: Generated<number>;
  userId: number;
  bio: string;
  fullname: string;
}

export type UserProfileType = {
  id?: number;
  userId: number;
  bio: string;
  fullname: string;
};
