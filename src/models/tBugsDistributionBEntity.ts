import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const tBugsDistributionB = sequelize.define('t_bugs_distributionb', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    level: {
        type: DataTypes.STRING,
        comment: "缺陷严重程度",
        allowNull: false
    },

    terminal: {
        type: DataTypes.STRING,
        comment: "缺陷终端",
        allowNull: false
    },

    num: {
        type: DataTypes.INTEGER,
        comment: "分布数量",
        allowNull: false
    },

    iteration: {
        type: DataTypes.STRING,
        comment: "迭代号，如Ver 1.28.0",
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

export default tBugsDistributionB
