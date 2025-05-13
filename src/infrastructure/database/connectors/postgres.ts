import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const postgresConnector = new Sequelize({
  dialect: "postgres",
  host: process.env.POSTGRES_DB_HOST ?? "127.0.0.1",
  port: Number(process.env.POSTGRES_DB_PORT) ?? 5432,
  username: process.env.POSTGRES_DB_USER ?? "postgres",
  password: process.env.POSTGRES_DB_PASS ?? "postgres",
  database: process.env.POSTGRES_DB_NAME ?? "postgres",
  schema: process.env.POSTGRES_DB_SCHEMA ?? "public",
});

export default postgresConnector;
