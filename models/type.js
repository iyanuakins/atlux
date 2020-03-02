const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

const TypeSchema = new Schema({ 
    cartype: {
        type: [SampleSchema]
    }
});


CarTypes = mongoose.model('CarTypes', TypeSchema);
module.exports = CarTypes;