import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  postgres: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_DB_HOST ?? "127.0.0.1",
      port: Number(process.env.POSTGRES_DB_PORT) ?? 5432,
      user: process.env.POSTGRES_DB_USER ?? "postgres",
      password: process.env.POSTGRES_DB_PASS ?? "postgres",
      database: process.env.POSTGRES_DB_NAME ?? "postgres",
    },
    searchPath: [process.env.POSTGRES_DB_SCHEMA ?? "public"],
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./src/infrastructure/database/migrations/postgres",
      tableName: "migrations",
      extension: "ts",
    },
  },
};

module.exports = config;
