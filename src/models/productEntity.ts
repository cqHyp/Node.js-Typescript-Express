import sequelize from "../sql/dbConfig";
import { DataTypes } from "sequelize";

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        comment: "商品名称"
    },

    price: {
        type: DataTypes.BIGINT,
        comment: "原价",
        defaultValue: null
    },

    discountPrice: {
        type: DataTypes.BIGINT,
        comment: "折扣价格(真实)",
        defaultValue: null
    },

    subTitle: {
        type: DataTypes.STRING,
        comment: "副标题"
    },

    description: {
        type: DataTypes.TEXT,
        comment: "商品详情富文本"
    },

    thumb: {
        type: DataTypes.STRING,
        comment: "商品预览图"
    },

    imgArray: {
        type: DataTypes.STRING,
        comment: "商品轮播图id数组"
    },

    category: {
        type: DataTypes.INTEGER,
        comment: "分类id",
        references: {
            model: "category",
            key: "id"
        }
    },

    status: {
        type: DataTypes.SMALLINT,
        comment: "商品状态 0：已下架、1：已上架"
    }

}, {
    freezeTableName: true
});

export default Product
