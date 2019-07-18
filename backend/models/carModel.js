const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    pricePerKM: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true,
        default: 'No Rating'
    }

});

Cars = mongoose.model('Cars', CarSchema);
module.exports = Cars;