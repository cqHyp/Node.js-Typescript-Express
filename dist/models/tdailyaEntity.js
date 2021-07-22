"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const dailyA = dbConfig_1.default.define('t_dailya', {
    dailyA_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    report_date: {
        type: sequelize_1.DataTypes.DATE,
        comment: "日报日期",
        defaultValue: new Date()
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "提交人外键t_user.id"
    },
    iteration: {
        type: sequelize_1.DataTypes.STRING,
        comment: "迭代号，如Ver 1.28.0",
        defaultValue: ""
    },
    R_pass_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "测试通过需求数",
        defaultValue: 0
    },
    R_pass_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "测试通过需求明细",
        defaultValue: ""
    },
    R_deny_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "测试不通过需求数",
        defaultValue: 0
    },
    R_deny_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "测试不通过需求明细",
        defaultValue: ""
    },
    R_checkdeny_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "验收被打回需求数",
        defaultValue: 0
    },
    R_checkdeny_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "验收被打回需求明细",
        defaultValue: ""
    },
    R_optimization_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "提交优化需求数",
        defaultValue: 0
    },
    R_optimization_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "提交优化需求明细",
        defaultValue: ""
    },
    R_totest: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "截止当天下班待测试需求数",
        defaultValue: 0
    },
    R_intest: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "截止当天下班测试中需求数",
        defaultValue: 0
    },
    B_test_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "提交测试缺陷数",
        defaultValue: 0
    },
    B_test_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "提交测试缺陷明细",
        defaultValue: ""
    },
    B_pass_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "复测通过缺陷数",
        defaultValue: 0
    },
    B_pass_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "复测通过缺陷明细",
        defaultValue: ""
    },
    B_deny_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "复测不通过缺陷数",
        defaultValue: 0
    },
    B_deny_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "复测不通过缺陷明细",
        defaultValue: ""
    },
    B_checkdeny_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "被提仿真环境缺陷数",
        defaultValue: 0
    },
    B_checkdeny_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "被提仿真环境缺陷明细",
        defaultValue: ""
    },
    B_formal_num: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "提交正式缺陷数",
        defaultValue: 0
    },
    B_formal_detail: {
        type: sequelize_1.DataTypes.STRING,
        comment: "提交正式缺陷明细",
        defaultValue: ""
    },
    B_totest: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "截止当天下班待测试缺陷数",
        defaultValue: 0
    },
    memo: {
        type: sequelize_1.DataTypes.TEXT,
        comment: "备注",
        defaultValue: ""
    },
    submittime: {
        type: sequelize_1.DataTypes.DATE,
        comment: "日报提交时间",
        defaultValue: new Date()
    }
}, {
    freezeTableName: true
});
exports.default = dailyA;
