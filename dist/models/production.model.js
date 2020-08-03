"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productionSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    detail: {
        type: String
    },
    thumb_img: {
        type: String
    }
});
