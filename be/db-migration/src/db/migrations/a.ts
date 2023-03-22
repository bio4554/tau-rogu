import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(30)", (col) => col.notNull())
    .addColumn("password", "varchar", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("post")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "varchar(100)", (col) => col.notNull())
    .addColumn("userId", "integer", (col) =>
      col.references("user.id").notNull()
    )
    .addColumn("datePosted", "bigint", (col) => col.notNull())
    .addColumn("description", "varchar")
    .execute();

  await db.schema
    .createTable("refresh")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.references("user.id").notNull()
    )
    .addColumn("valid", "boolean", (col) => col.notNull())
    .addColumn("dateCreated", "bigint", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("refresh").execute();
  await db.schema.dropTable("post").execute();
  await db.schema.dropTable("user").execute();
}
