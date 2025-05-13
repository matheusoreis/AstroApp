import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const mariaConnector = new Sequelize({
  dialect: "mariadb",
  host: process.env.MARIA_DB_HOST ?? "127.0.0.1",
  port: Number(process.env.MARIA_DB_PORT) ?? 3306,
  username: process.env.MARIA_DB_USER ?? "mariadb",
  password: process.env.MARIA_DB_PASS ?? "mariadb",
  database: process.env.MARIA_DB_NAME ?? "mariadb",
});

export default mariaConnector;
