import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const tRequestsDistribution = sequelize.define('t_requests_distribution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    module: {
        type: DataTypes.STRING,
        comment: "功能模块",
        allowNull: false
    },

    type: {
        type: DataTypes.STRING,
        comment: "需求分类",
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

export default tRequestsDistribution
