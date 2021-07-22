import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const dailyA = sequelize.define('t_dailya', {
    dailyA_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    report_date: {
        type: DataTypes.DATE,
        comment: "日报日期",
        defaultValue: new Date()
    },

    user_id: {
        type: DataTypes.INTEGER,
        comment: "提交人外键t_user.id"
    },

    iteration: {
        type: DataTypes.STRING,
        comment: "迭代号，如Ver 1.28.0",
        defaultValue: ""
    },

    R_pass_num: {
        type: DataTypes.INTEGER,
        comment: "测试通过需求数",
        defaultValue: 0
    },

    R_pass_detail: {
        type: DataTypes.STRING,
        comment: "测试通过需求明细",
        defaultValue: ""
    },

    R_deny_num: {
        type: DataTypes.INTEGER,
        comment: "测试不通过需求数",
        defaultValue: 0
    },

    R_deny_detail: {
        type: DataTypes.STRING,
        comment: "测试不通过需求明细",
        defaultValue: ""
    },

    R_checkdeny_num: {
        type: DataTypes.INTEGER,
        comment: "验收被打回需求数",
        defaultValue: 0
    },

    R_checkdeny_detail: {
        type: DataTypes.STRING,
        comment: "验收被打回需求明细",
        defaultValue: ""
    },

    R_optimization_num: {
        type: DataTypes.INTEGER,
        comment: "提交优化需求数",
        defaultValue: 0
    },

    R_optimization_detail: {
        type: DataTypes.STRING,
        comment: "提交优化需求明细",
        defaultValue: ""
    },

    R_totest: {
        type: DataTypes.INTEGER,
        comment: "截止当天下班待测试需求数",
        defaultValue: 0
    },

    R_intest: {
        type: DataTypes.INTEGER,
        comment: "截止当天下班测试中需求数",
        defaultValue: 0
    },

    B_test_num: {
        type: DataTypes.INTEGER,
        comment: "提交测试缺陷数",
        defaultValue: 0
    },

    B_test_detail: {
        type: DataTypes.STRING,
        comment: "提交测试缺陷明细",
        defaultValue: ""
    },

    B_pass_num: {
        type: DataTypes.INTEGER,
        comment: "复测通过缺陷数",
        defaultValue: 0
    },

    B_pass_detail: {
        type: DataTypes.STRING,
        comment: "复测通过缺陷明细",
        defaultValue: ""
    },

    B_deny_num: {
        type: DataTypes.INTEGER,
        comment: "复测不通过缺陷数",
        defaultValue: 0
    },

    B_deny_detail: {
        type: DataTypes.STRING,
        comment: "复测不通过缺陷明细",
        defaultValue: ""
    },

    B_checkdeny_num: {
        type: DataTypes.INTEGER,
        comment: "被提仿真环境缺陷数",
        defaultValue: 0
    },

    B_checkdeny_detail: {
        type: DataTypes.STRING,
        comment: "被提仿真环境缺陷明细",
        defaultValue: ""
    },

    B_formal_num: {
        type: DataTypes.INTEGER,
        comment: "提交正式缺陷数",
        defaultValue: 0
    },

    B_formal_detail: {
        type: DataTypes.STRING,
        comment: "提交正式缺陷明细",
        defaultValue: ""
    },

    B_totest: {
        type: DataTypes.INTEGER,
        comment: "截止当天下班待测试缺陷数",
        defaultValue: 0
    },

    memo: {
        type: DataTypes.TEXT,
        comment: "备注",
        defaultValue: ""
    },

    submittime: {
        type: DataTypes.DATE,
        comment: "日报提交时间",
        defaultValue: new Date()
    }

}, {
    freezeTableName: true
});

export default dailyA