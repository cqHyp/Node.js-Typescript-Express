import sequelize from "../sql/dbConfig";
import { DataTypes } from "sequelize";

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        comment: "分类标题"
    },

    desc: {
        type: DataTypes.STRING,
        comment: "分类简述"
    },

    sortCode: {
        type: DataTypes.INTEGER,
        comment: "权重"
    },

}, {
    freezeTableName: true
});

export default Category
