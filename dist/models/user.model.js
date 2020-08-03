"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const Mchema = mysql.Schema;
const userSchema = new Schema({
    openid: {
        type: String
    },
    unionid: {
        type: String
    },
    name: {
        type: String
    },
    nickName: {
        type: String
    },
    gender: {
        type: Number
    },
    language: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    country: {
        type: String
    },
    avatarUrl: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue'],
        default: 'active'
    },
    company: {
        type: String
    },
    mobile: {
        type: Number
    },
    address: {
        type: String
    },
    token: {
        type: String
    },
    session_key: {
        type: String
    },
    session_key_updated_date: {
        type: Date
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    changed_date: {
        type: Date
    }
});
userSchema.pre("save", function (next) {
    let v = this;
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(v.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }
        v.password = hash;
        return next();
    });
});
userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return new Promise((resovle, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err)
                return reject(err);
            return resovle(same);
        });
    });
};
const User = mongoose.model('user', userSchema);
exports.default = User;
