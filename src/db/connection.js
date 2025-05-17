
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config() // Carga las variables de entorno desde .env

// Extrae las variables de entorno

const dbName = process.env.DB_NAME || 'transporte_carga';
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbDialect = process.env.DB_DIALECT || 'mysql';
const dbPort = process.env.DB_PORT || 3306;

 // Crea una instancia de Sequelize
 const sequelize = new Sequelize(dbName,dbUser,dbPass,{
    host:dbHost,
    dialect:dbDialect,
    port: dbPort,
    logging:false  // Desactiva los logs SQL
 });

 export default sequelize;