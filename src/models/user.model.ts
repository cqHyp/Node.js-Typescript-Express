import * as mongoose from "mongoose";

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
})

const User = mongoose.model('user', userSchema)

export default User