const axios = require('axios');

const Sms = require('../models/Sms');
const User = require('../models/User');

removeNull = (value) => {
    (value !== null)
    return value;
}

class SmsController {
    async sendSms(req, res) {

        const message = req.body;
        try {
            const response = await axios.post(process.env.SMS_API, {
                from: message.user_id,
                to: message.to,
                schedule: message.schedule,
                msg: message.msg,
                id: message._id
            }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic YWRtaW46YWRtaW4=',
                        'Accept': 'application/json'
                    }
                });

            message.sendSmsResponse = response.data.sendSmsResponse;

            const sms = await Sms.create(message)

            return res.send({ sms });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async searchForDate(req, res) {
        const { initialDate, lastDate, department } = req.body;

        try {
            let messages = await Sms.find({
                schedule: {
                    $gte: `${initialDate}`, $lte: `${lastDate}`
                },
            })
                .populate({
                    path: 'user_id',
                    populate: {
                        path: 'costCenter'
                    }
                })
                .exec();

            if (!department)
                return res.send({ messages });

            messages = messages.map(message =>
                (message.user_id.costCenter.department === department
                    || message.user_id.costCenter.cod === department)
                    ? message
                    : null);

            messages = messages.filter(removeNull);

            return res.send({ messages });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async showById(req, res) {
        try {
            const message = await Sms.findById(req.params.id);

            return res.send({ message });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }
}

module.exports = new SmsController();