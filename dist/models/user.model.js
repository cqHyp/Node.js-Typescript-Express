"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
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
