import { mysql_config } from "../config";
import { Sequelize } from "sequelize";

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
        }
    }
);

sequelize.authenticate().then(() => {
        console.log('Connection successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;