const mongoose = require('../../database/index');

const SmsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: [{
        type: String,
        required: true
    }],
    schedule: {
        type: Date,
        default: Date.now
    },
    msg: {
        type: String,
        required: true
    },
    sendSmsResponse: {
        statusCode: {
            type: String
        },
        statusDescription: {
            type: String
        },
        detailCode: {
            type: String
        },
        detailDescription: {
            type: String
        },
    }
});

const Sms = mongoose.model('Sms', SmsSchema);

module.exports = Sms;