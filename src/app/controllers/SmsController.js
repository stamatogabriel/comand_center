const smsApi = require('../../services/sms-api');

const axios = require('axios');

const Sms = require('../models/Sms');

class SmsController {
    async sendSms(req, res) {
        let sms = await Sms.create(req.body);

        sms = await sms.populate('user').execPopulate();

        const response = await axios.post(process.env.SMS_API, {
            from: sms.user.name,
            to: sms.to,
            schedule: sms.schedule,
            msg: sms.msg,
            id: sms._id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46YWRtaW4=',
                'Accept': 'application/json'
            }
            });

        const value = response.data;

        return res.send({ sms, value });
    }
}

module.exports = new SmsController();