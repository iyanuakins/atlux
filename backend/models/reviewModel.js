const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    carId: {
        type: String,
        required: true
    },
    driverId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    review: {
        type: String,
        required: true
    },
    oneWord: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

Reviews = mongoose.model('Reviews', ReviewSchema);
module.exports = Reviews;