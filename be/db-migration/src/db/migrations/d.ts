import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("user_profile")
    .addColumn("profileImage", "varchar", (col) =>
      col.notNull().defaultTo("default")
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("user_profile")
    .dropColumn("profileImage")
    .execute();
}
