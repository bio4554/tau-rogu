import { Generated } from "kysely";

export interface UserRecord {
  id?: Generated<number>;
  name: string;
  password: string;
  joinedDate: number;
}

export type UserRecordType = {
  id?: number;
  name: string;
  password: string;
};

export interface RefreshRecord {
  id?: Generated<number>;
  user_id: number;
  valid: boolean;
}

export type RefreshRecordType = {
  id?: number;
  user_id: number;
  valid: boolean;
};

export interface PostRecord {
  id?: Generated<number>;
  title: string;
  userId: number;
  datePosted: number;
  description: string;
}

export type PostRecordType = {
  id?: number;
  title: string;
  userId: number;
  datePosted: number;
  description: string;
};

export interface UserProfileRecord {
  id?: Generated<number>;
  userId: number;
  bio: string;
  fullname: string;
  profileImage: string;
}
