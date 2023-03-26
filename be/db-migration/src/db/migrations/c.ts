import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user_profile")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("userId", "integer", (col) =>
      col.references("user.id").notNull()
    )
    .addColumn("bio", "varchar(250)", (col) => col.notNull())
    .addColumn("fullname", "varchar(20)", (col) => col.notNull())
    .execute();

  await db.schema
    .alterTable("user")
    .addColumn("joinedDate", "bigint", (col) =>
      col.notNull().defaultTo("1679804224")
    )
    .execute();

  await db.schema
    .createIndex("profile_user_id_index")
    .on("user_profile")
    .column("userId")
    .execute();

  await db.schema
    .createIndex("post_user_id_index")
    .on("post")
    .column("userId")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_profile").execute();

  await db.schema.alterTable("user").dropColumn("joinedDate").execute();
}
