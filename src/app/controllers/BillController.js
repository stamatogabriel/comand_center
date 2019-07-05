const { Cost, Sms, Email } = require('../models');

getMessages = async (initialDate, lastDate, department, messageType) => {
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
        return res.status(400).send({
            error: "Could not make the required request. Please, try again later!"
        })
    }
}

class BillControler {
    async calculate() {
        try {
            const { initialDate, lastDate, department } = req.body;



        } catch {
            return res.status(400).send({
                error: "Could not make the required request. Please, try again later!"
            });
        }
    }
}

module.exports = new BillControler();