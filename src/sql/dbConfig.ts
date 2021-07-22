import { mysql_config } from "../config";
import { Sequelize } from "sequelize";
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

const sequelize = new Sequelize(
    mysql_config.database,
    mysql_config.user,
    mysql_config.password,
    {
        host: mysql_config.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        },
        timezone: '+08:00',
        operatorsAliases: operatorsAliases
    },
    
);

sequelize.authenticate().then(() => {
        console.log('Connection successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;