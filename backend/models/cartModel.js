const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    carId: {
        type: String,
        required: true
    },
    carPrice: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Carts', cartSchema);