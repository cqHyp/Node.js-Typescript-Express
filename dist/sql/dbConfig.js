"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const sequelize_1 = require("sequelize");
const { Op } = require("sequelize");
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};
const sequelize = new sequelize_1.Sequelize(config_1.mysql_config.database, config_1.mysql_config.user, config_1.mysql_config.password, {
    host: config_1.mysql_config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    timezone: '+08:00',
    operatorsAliases: operatorsAliases
});
sequelize.authenticate().then(() => {
    console.log('Connection successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
