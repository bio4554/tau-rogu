import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("post").dropColumn("datePosted").execute();
  await db.schema
    .alterTable("post")
    .addColumn("datePosted", "varchar", (col) =>
      col.defaultTo("2023-03-26T21:24:50+0000").notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("post").dropColumn("datePosted").execute();
  await db.schema
    .alterTable("post")
    .addColumn("datePosted", "bigint", (col) => col.defaultTo(0).notNull())
    .execute();
}
