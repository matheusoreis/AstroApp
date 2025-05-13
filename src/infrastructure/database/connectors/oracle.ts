import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const oracleConnector = new Sequelize({
  dialect: "oracle",
  username: process.env.ORACLE_DB_USER ?? "oracle",
  password: process.env.ORACLE_DB_PASS ?? "oracle",
  dialectOptions: {
    connectString: `${process.env.ORACLE_DB_HOST}:${process.env.ORACLE_DB_PORT}/${process.env.ORACLE_DB_NAME}`,
  },
});

export default oracleConnector;
