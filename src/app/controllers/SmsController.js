const axios = require('axios');

const Sms = require('../models/Sms');

removeNull = (value) => {
    (value !== null)
    return value;
}

class SmsController {
    async sendSms(req, res) {

        const message = req.body;
        try {
            const response = await axios.post(process.env.SMS_API, {
                from: req.userId,
                to: message.to,
                schedule: message.schedule,
                msg: message.msg
            }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic YWRtaW46YWRtaW4=',
                        'Accept': 'application/json'
                    }
                });

            message.sendSmsResponse = response.data.sendSmsResponse;

            const sms = await Sms.create({ ...message, user_id: req.userId })

            return res.send({ sms });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async searchForDate(req, res) {
        const { initialDate, lastDate, department } = req.body;

        if (req.userAdmin === true) {
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
        } else {
            res.send({ error: "Not authorized" });
        }
    }

    async showById(req, res) {
        if (req.userAdmin === true) {
            try {
                const message = await Sms.findById(req.params.id);

                return res.send({ message });
            } catch {
                return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
            }
        } else {
            res.send({ error: "Not authorized" });
        }
    }
}

module.exports = new SmsController();