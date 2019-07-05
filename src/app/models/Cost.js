const mongoose = require('../../database/index');

const CostSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Cost = mongoose.model('Cost', CostSchema);

module.exports = Cost;