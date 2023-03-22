import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("follow")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("following", "integer", (col) =>
      col.references("user.id").notNull()
    )
    .addColumn("follower", "integer", (col) =>
      col.references("user.id").notNull()
    )
    .addColumn("datePosted", "bigint", (col) => col.notNull())
    .execute();

  await db.schema
    .createIndex("follow_following_index")
    .on("follow")
    .column("following")
    .execute();

  await db.schema
    .createIndex("follow_follower_index")
    .on("follow")
    .column("follower")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("follow").execute();
}
