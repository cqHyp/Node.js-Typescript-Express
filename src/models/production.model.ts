import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const productionSchema = new Schema({
    
    /**产品名称 */
    name: {
        type: String
    },

    /**产品介绍 */
    description: {
        type: String
    },

    /**库存 */
    stock: {
        type: Number
    },

    /**详情 */
    detail: {
        type: String
    },

    /**缩略图 */
    thumb_img: {
        type: String
    }
})