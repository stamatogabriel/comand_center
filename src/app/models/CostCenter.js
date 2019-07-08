const mongoose = require('../../database/index');

const CostCenterSchema = mongoose.Schema({
    department: {
        type: String,
        required: true,
        unique: true,
    },
    cod: {
        type: Number,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const CostCenter = mongoose.model('CostCenter', CostCenterSchema);

module.exports = CostCenter;