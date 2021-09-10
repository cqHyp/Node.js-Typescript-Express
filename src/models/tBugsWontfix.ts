import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const tBugsWontfix = sequelize.define('t_bugs_wontfix', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    iteration: {
        type: DataTypes.STRING,
        comment: "迭代号，如Ver 1.28.0",
        allowNull: false
    },

    taskid: {
        type: DataTypes.STRING,
        comment: "缺陷编号",
        allowNull: false
    },

    reason: {
        type: DataTypes.STRING,
        comment: "不修复原因",
        allowNull: false
    },

    developer: {
        type: DataTypes.STRING,
        comment: "开发人员",
    },

    importdate: {
        type: DataTypes.DATE,
        comment: "导入日期",
    },

    importperson: {
        type: DataTypes.STRING,
        comment: "导入人",
    },

    memo: {
        type: DataTypes.STRING,
        comment: "备注"
    }

}, {
    timestamps: false,
    freezeTableName: true
});

export default tBugsWontfix
