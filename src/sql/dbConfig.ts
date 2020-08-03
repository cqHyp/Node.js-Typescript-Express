import * as mysql from "mysql";
import {mysql_config} from "../config";
import { connection } from "mongoose";

exports.base = (sql, data, callback) => {
    const db = mysql.createConnection(mysql_config);
    
    db.connect((err) => {
        if (err) throw err;
        console.log("数据库连接成功");
    });

    db.query(sql, data, (error, results, fields) => {
        if (error) throw error;
        callback(results);
    });

    db.end();
}