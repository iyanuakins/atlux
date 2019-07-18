const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DetailsSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    lastBooking: {
        type: Date,
        default: Date.now
    },
    lastBooked: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    phNum: {
        type: String,
        required: true
    }
});

const UserSchema = new Schema({
    email: {
            type: String,
            required: true
    },
    username: {
            type: String,
            required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'client'
    },
    dateReg: {
            type: Date,
            default: Date.now
    },
    level: {
        type: Number,
        default: 1
    },
    cartId: {
        type: String,
        default: '0'
    },
    details: DetailsSchema
    
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;