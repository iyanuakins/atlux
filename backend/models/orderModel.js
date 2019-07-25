const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    orderedTime: {
        type: Date,
        default: Date.now
    },
    carId: {
        type: String,
        required: true
    },
    driverId: {
        type: String,
        required: true,
        default: 'waiting'
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    location: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    distance: {
        type: String,
        required: true,
        default: '30'
    },
    reviewed: {
        type: String,
        default: 'pending',
    },
    pickUpTime: {
        type: String,
        required: true
    },
    pickUpDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);