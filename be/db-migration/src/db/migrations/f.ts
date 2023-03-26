import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("post").addColumn("imageUrl", "varchar").execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("post").dropColumn("imageUrl").execute();
}
