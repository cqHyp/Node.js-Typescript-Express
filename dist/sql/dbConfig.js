"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(config_1.mysql_config.database, config_1.mysql_config.user, config_1.mysql_config.password, {
    host: config_1.mysql_config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
sequelize.authenticate().then(() => {
    console.log('Connection successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
