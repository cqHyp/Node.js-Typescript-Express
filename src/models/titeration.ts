import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const tIteration = sequelize.define('t_iteration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    iteration: {
        type: DataTypes.STRING,
        comment: "迭代号，如Ver 1.28.0",
        defaultValue: ""
    },

    state: {
        type: DataTypes.SMALLINT,
        comment: "迭代状态 1:完成 0:未完成",
        defaultValue: 0
    },

    startdate: {
        type: DataTypes.DATE,
        comment: "迭代开始日期",
    },

    enddate: {
        type: DataTypes.DATE,
        comment: "迭代结束日期",
    },

    memo: {
        type: DataTypes.STRING,
        comment: "备注"
    }

}, {
    freezeTableName: true
});

export default tIteration