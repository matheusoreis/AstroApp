import mariaConnector from "./connectors/mariadb";
import oracleConnector from "./connectors/oracle";
import postgresConnector from "./connectors/postgres";

export const mariaDb = mariaConnector;
export const postgres = postgresConnector;
export const oracle = oracleConnector;
