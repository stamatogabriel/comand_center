require('dotenv/config');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

generateToken = (params = {}) => {
    return jwt.sign({ params }, process.env.APP_SECRET, {
        expiresIn: 86400,
    });
};

class AuthController {

    async store(req, res) {
        const { email } = req.body;

        try {
            if (await User.findOne({ email }))
                return res.status(400).send({ error: 'User already exists' });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({ user, token: generateToken({ id: user._id }) });
        } catch (err) {
            return res.status(400).send({ error: "Register failed. Please, try again." });
        }
    }

    async session(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email }).select('+password').populate('costCenter');
            if (!user)
                return res.status(400).send({ error: 'User not found' });

            if (!await bcrypt.compare(password, user.password))
                return res.status(401).send({ error: 'Invalid password' });

            user.password = undefined;

            return res.send({ user, token: generateToken({ id: user._id }) });
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Something went wrong. Please try again.' })
        }
    }
}

module.exports = new AuthController();