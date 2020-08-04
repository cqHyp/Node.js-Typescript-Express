import sequelize from "../sql/dbConfig";
import { DataTypes } from "sequelize";

const Banner = sequelize.define('banner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING
    },

    imgUrl: {
        type: DataTypes.STRING
    },

    type: {
        type: DataTypes.SMALLINT
    },

    sortCode: {
        type: DataTypes.INTEGER
    },

}, {
    freezeTableName: true
});

export default Banner
