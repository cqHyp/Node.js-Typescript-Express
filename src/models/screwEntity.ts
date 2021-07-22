import sequelize from "../sql/dbConfig";
import { DataTypes } from "sequelize";

const Screw = sequelize.define('screw', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        comment: "弹簧名称"
    },

    model: {
        type: DataTypes.STRING,
        comment: "弹簧型号",
    },

    price: {
        type: DataTypes.BIGINT,
        comment: "单价"
    },

    status: {
        type: DataTypes.SMALLINT,
        comment: "商品状态 0：已下架、1：已上架"
    }

}, {
    freezeTableName: true
});

export default Screw
