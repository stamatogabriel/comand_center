const mailer = require('../../modules/mailer');

const Email = require('../models/Email');

class EmailController {
    async sendEmail(req, res) {
        const { to, msg, priority } = req.body;

        try {
            const response = await mailer.sendMail({
                bcc: to,
                from: 'stamato7@gmail.com',
                template: 'email/send_mail',
                context: { msg },
                priority
            });

            const email = await Email.create({
                user_id: '5d1cd845262368237c0bd09d',
                to,
                msg, 
                priority,
                mail: response
            })

            return res.send({ email })
        } catch {
            return res.status(400).send({ 
                error: "Could not make the required request. Please, try again later!" 
            })
        }
    }

    async searchForDate(req, res) {
        const { initialDate, lastDate, department } = req.body;

        try {
            let emails = await Email.find({
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
                return res.send({ emails });

            emails = emails.map(email =>
                (email.user_id.costCenter.department === department
                    || email.user_id.costCenter.cod === department)
                    ? email
                    : null);

            emails = emails.filter(removeNull);

            return res.send({ emails });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async showById(req, res) {
        try {
            const email = await Sms.findById(req.params.id);

            return res.send({ email });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }
}

module.exports = new EmailController();