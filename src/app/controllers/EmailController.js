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

            const mail = await Email.create({
                user_id: '5d1cd845262368237c0bd09d',
                to,
                msg, 
                priority,
                mail: response
            })

            return res.send({ mail })
        } catch {
            return res.status(400).send({ 
                error: "Could not make the required request. Please, try again later!" 
            })
        }
    }
}

module.exports = new EmailController();