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
// exports.base = (sql: String, data: [], callback: (arg0: any) => void) => {
    // const db = mysql.createConnection(mysql_config);

    // db.connect((err: any) => {
    //     if (err) throw err;
    //     console.log("数据库连接成功");
    // });

    // db.query(sql, data, (error, results, fields) => {
    //     if (error) throw error;
    //     callback(results);
    // });

    // db.end();
// }