import sequelize from "../sql/dbConfig";
import { DataTypes } from "sequelize";

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING
    },

    desc: {
        type: DataTypes.STRING
    },

    sortCode: {
        type: DataTypes.INTEGER
    },

}, {
    freezeTableName: true
});

export default Category
