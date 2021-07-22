import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const tUser = sequelize.define('t_user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_name: {
        type: DataTypes.STRING,
        comment: "姓名",
        defaultValue: ""
    },

    indate: {
        type: DataTypes.STRING,
        comment: "入职年月",
        defaultValue: ""
    },

    isactive: {
        type: DataTypes.SMALLINT,
        comment: "1-在职，0-离职",
        defaultValue: 1
    },

    dailyA: {
        type: DataTypes.SMALLINT,
        comment: "是否参与迭代功能测试 1-是，0-否",
        defaultValue: 1
    },

    dailyB: {
        type: DataTypes.SMALLINT,
        comment: "是否参与接口自动化测试 1-是，0-否",
        defaultValue: 0
    },

    dailyC: {
        type: DataTypes.SMALLINT,
        comment: "是否参与UI自动化测试 1-是，0-否",
        defaultValue: 0
    },

    dailyD: {
        type: DataTypes.SMALLINT,
        comment: "是否参与其他工作 1-是，0-否",
        defaultValue: 1
    },

    memo: {
        type: DataTypes.STRING,
        comment: "备注",
        defaultValue: ""
    },

    password: {
        type: DataTypes.STRING,
        comment: "密码",
        defaultValue: "123456"
    },

}, {
    freezeTableName: true
});

export default tUser