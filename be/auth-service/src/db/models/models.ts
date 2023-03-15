import { Generated } from "kysely";

export interface UserRecord {
  id?: Generated<number>;
  name: string;
  password: string;
}
