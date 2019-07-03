const CostCenter = require('../models/CostCenter');

class CostCenterController {
    async store(req, res) {
        try {
            const costCenter = await CostCenter.create(req.body);

            return res.send({ costCenter })
        } catch (err) {
            return res.status(400).send({ error: "Register failed. Please, try again." });
        }
    }

    async index(req, res) {
        try {
            const costCenters = await CostCenter.find()

            return res.send({ costCenters });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async show(req, res) {
        try {
            const costCenter = await CostCenter.findById(req.params.id);

            return res.send({ costCenter });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async searchByCod(req, res) {
        try {
            const { cod } = req.params;

            const costCenter = await CostCenter.find({ cod });

            return res.send({ costCenter });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async searchByDepartment(req, res) {
        try {
            const { department } = req.params;

            console.log(department);

            const costCenter = await CostCenter.find({ department });

            return res.send({ costCenter });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }

    async destroy(req, res) {
        try {
            await CostCenter.findByIdAndDelete(req.params.id);

            return res.status(200).send({ success: "Cost Center succesfull deleted" });
        } catch {
            return res.status(400).send({ error: "Could not make the required request. Please, try again later!" })
        }
    }
}

module.exports = new CostCenterController();