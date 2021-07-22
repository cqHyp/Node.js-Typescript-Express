import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const dailyB = sequelize.define('t_dailyb', {
    dailyB_id: {
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

    task1_no: {
        type: DataTypes.STRING,
        comment: "任务1测试编号",
        defaultValue: ""
    },

    task1_interface_num: {
        type: DataTypes.INTEGER,
        comment: "任务1涉及接口数",
        defaultValue: 0
    },

    task1_sampler_num: {
        type: DataTypes.INTEGER,
        comment: "任务1涉及请求数",
        defaultValue: 0
    },

    task1_script: {
        type: DataTypes.STRING,
        comment: "任务1涉及脚本名",
        defaultValue: ""
    },

    task2_no: {
        type: DataTypes.STRING,
        comment: "任务2测试编号",
        defaultValue: ""
    },

    task2_interface_num: {
        type: DataTypes.INTEGER,
        comment: "任务2涉及接口数",
        defaultValue: 0
    },

    task2_sampler_num: {
        type: DataTypes.INTEGER,
        comment: "任务2涉及请求数",
        defaultValue: 0
    },

    task2_script: {
        type: DataTypes.STRING,
        comment: "任务2涉及脚本名",
        defaultValue: ""
    },

    task3_no: {
        type: DataTypes.STRING,
        comment: "任务3测试编号",
        defaultValue: ""
    },

    task3_interface_num: {
        type: DataTypes.INTEGER,
        comment: "任务3涉及接口数",
        defaultValue: 0
    },

    task3_sampler_num: {
        type: DataTypes.INTEGER,
        comment: "任务3涉及请求数",
        defaultValue: 0
    },

    task3_script: {
        type: DataTypes.STRING,
        comment: "任务3涉及脚本名",
        defaultValue: ""
    },

    task4_no: {
        type: DataTypes.STRING,
        comment: "任务4测试编号",
        defaultValue: ""
    },

    task4_interface_num: {
        type: DataTypes.INTEGER,
        comment: "任务4涉及接口数",
        defaultValue: 0
    },

    task4_sampler_num: {
        type: DataTypes.INTEGER,
        comment: "任务4涉及请求数",
        defaultValue: 0
    },

    task4_script: {
        type: DataTypes.STRING,
        comment: "任务4涉及脚本名",
        defaultValue: ""
    },

    task5_no: {
        type: DataTypes.STRING,
        comment: "任务5测试编号",
        defaultValue: ""
    },

    task5_interface_num: {
        type: DataTypes.INTEGER,
        comment: "任务5涉及接口数",
        defaultValue: 0
    },

    task5_sampler_num: {
        type: DataTypes.INTEGER,
        comment: "任务5涉及请求数",
        defaultValue: 0
    },

    task5_script: {
        type: DataTypes.STRING,
        comment: "任务5涉及脚本名",
        defaultValue: ""
    },

    task6_no: {
        type: DataTypes.STRING,
        comment: "任务6测试编号",
        defaultValue: ""
    },

    task6_interface_num: {
        type: DataTypes.INTEGER,
        comment: "任务6涉及接口数",
        defaultValue: 0
    },

    task6_sampler_num: {
        type: DataTypes.INTEGER,
        comment: "任务6涉及请求数",
        defaultValue: 0
    },

    task6_script: {
        type: DataTypes.STRING,
        comment: "任务6涉及脚本名",
        defaultValue: ""
    },

    memo: {
        type: DataTypes.TEXT,
        comment: "备注",
        defaultValue: ""
    }

}, {
    freezeTableName: true
});

export default dailyB