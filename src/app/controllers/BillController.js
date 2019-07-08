const Sms = require('../models/Sms');
const Email = require('../models/Email');
const CostCenter = require('../models/CostCenter');

getMessages = async (initialDate, lastDate, department) => {
    try {
        const messages = {};

        messages.sms = await Sms.find({
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


        messages.sms = messages.sms.map(message =>
            (message.user_id.costCenter.department === department
                || message.user_id.costCenter.cod === department)
                ? message
                : null);

        messages.sms = messages.sms.filter(removeNull);

        messages.email = await Email.find({
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


        messages.email = messages.email.map(message =>
            (message.user_id.costCenter.department === department
                || message.user_id.costCenter.cod === department)
                ? message
                : null);

        messages.email = messages.email.filter(removeNull);

        return messages;

    } catch {
        return res.status(400).send({
            error: "Could not make the required request. Please, try again later!"
        })
    }
}

class BillControler {
    async calculate(req, res) {
        if (req.userAdmin === true) {
            const priceEmail = 0.15;
            const priceSms = 0.2;

            try {
                const { initialDate, lastDate, department } = req.body;

                if (!initialDate, !lastDate, !department)
                    return res.send({ error: "Please, enter with all information" })

                const costCenter = (typeof department === 'number') ?
                    await CostCenter.findOne({ cod: department }) :
                    await CostCenter.findOne({ department });

                const messages = await getMessages(initialDate, lastDate, department);

                const qntEmails = messages.email.length;
                const qntSms = messages.sms.length;

                const costsByDepartment = {
                    codCostCenter: costCenter.cod,
                    costCenterDescription: costCenter.department,
                    qntEmails,
                    totalCostEmails: (qntEmails * priceEmail).toFixed(2),
                    qntSms,
                    totalCostSms: (qntSms * priceSms).toFixed(2),
                    totalCost: ((qntEmails * priceEmail) + (qntSms * priceSms)).toFixed(2)
                }

                return res.send({ costsByDepartment });

            } catch (err) {
                console.log(err)
                return res.status(400).send({
                    error: "Could not make the required request. Please, try again later!"
                });
            }
        } else {
            res.send({ error: "Not authorized" });
        }
    }
}

module.exports = new BillControler();