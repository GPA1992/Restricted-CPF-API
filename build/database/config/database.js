"use strict";
require("dotenv/config");
const config = {
    username: process.env.MYSQL_USER || 'gpa',
    password: process.env.MYSQL_PASSWORD || 'gabriel1',
    database: process.env.DB_NAME || 'visitors',
    host: process.env.MYSQL_HOST || 'api-node-db.chqpb5pvf83t.sa-east-1.rds.amazonaws.com',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
};
module.exports = config;
