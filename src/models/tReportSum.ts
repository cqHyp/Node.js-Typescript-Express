import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const tReportSum = sequelize.define('t_report_sum', {
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

    summary: {
        type: DataTypes.STRING,
        comment: "总结",
        allowNull: false
    },

    comment: {
        type: DataTypes.STRING,
        comment: "评语",
        allowNull: false
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

export default tReportSum
