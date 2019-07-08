require('dotenv/config');

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' })
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
        
        req.userId = decoded.params.id;
        req.userCostCenter = decoded.params.costCenter;
        req.userAdmin = decoded.params.admin;
        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Token invalid' })
    }

    return next();
};