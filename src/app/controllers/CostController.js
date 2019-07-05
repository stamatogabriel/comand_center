const Cost = require('../models/Cost');

class CostControler {
    async index(req, res) {
        try {
            const costs = await Cost.find();

            return res.send({ costs });
        } catch {
            return res.status(400).send({ 
                error: "Could not make the required request. Please, try again later!" 
            })
        }
    }

    async store(req, res) {
        try {
            const cost = await Cost.create(req.body);

            return res.send({ cost })
        } catch (err) {
            return res.status(400).send({ 
                error: "Register failed. Please, try again." 
            });
        }
    }

    async update(req, res) {
        const { value, userId } = req.body;
        const id = req.params.id;

        try {
            const cost = await Cost.findByIdAndUpdate(id, {
                value,
                modifiedBy: userId,
                updatedAt: Date.now()
            }, { new: true });

            return res.send({ cost });
        } catch (err) {
            console.log(err)
            return res.status(400).send({ 
                error: "Could not make the required request. Please, try again later!" 
            })
        }
    }

    async destroy(req, res) {
        try {
            await Cost.findByIdAndDelete(req.params.id);

            return res.status(200).send({ 
                success: "Cost succesfull deleted" 
            });
        } catch {
            return res.status(400).send({ 
                error: "Could not make the required request. Please, try again later!" 
            })
        }
    }
}

module.exports = new CostControler();