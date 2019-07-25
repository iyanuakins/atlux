const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MakerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

const BrandSchema = new Schema({
    brand: { 
        type: [MakerSchema]
    }
});

module.exports = mongoose.model('Brands', BrandSchema);