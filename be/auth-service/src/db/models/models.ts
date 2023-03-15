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
