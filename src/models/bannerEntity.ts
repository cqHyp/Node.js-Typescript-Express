import sequelize from "../sql/dbConfig";
import { DataTypes } from "sequelize";

const Banner = sequelize.define('banner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        comment: "标题"
    },

    imgUrl: {
        type: DataTypes.STRING,
        comment: "图片地址"
    },

    type: {
        type: DataTypes.SMALLINT,
        comment: "类型 1：默认"
    },

    sortCode: {
        type: DataTypes.INTEGER,
        comment: "权重"
    },

}, {
    freezeTableName: true
});

export default Banner
