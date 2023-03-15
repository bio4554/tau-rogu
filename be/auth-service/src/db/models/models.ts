import { Generated } from "kysely";

export interface UserRecord {
  id?: Generated<number>;
  name: string;
  password: string;
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
  dateCreated: number;
}

export type RefreshRecordType = {
  id?: number;
  user_id: number;
  valid: boolean;
  dateCreated: number;
};
