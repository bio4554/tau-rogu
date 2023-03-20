import * as dotenv from "dotenv";
dotenv.config();
import config from "./app.config";
import * as path from 'path'
import { Pool } from 'pg'
import { promises as fs } from 'fs'
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider
} from 'kysely'
import {db} from './db/db'

async function migrateToLatest() {
  
  console.log(__filename)
  console.log(__dirname)
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: `${__dirname}/db/migrations`,
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()



