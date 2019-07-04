const mongoose = require('../../database/index');

const EmailSchema = mongoose.Schema({
    user_id: {
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
    priority: {
        type: String,
        required: true
    },
    mail: {
        accepted: [{
            type: String,
          }],
          rejected: [{type: String}],
          envelopeTime: {
              type: Number
          },
          messageTime: {
            type: Number
        },
          messageSize: {
            type: Number
        },
          response: {
            type: String
        },
          envelope: {
            from: {
                type: String
            },
            to:[{
                type: String
            }]
          },
          messageId: {
            type: String
        }
    }
});

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email;