require('dotenv/config');

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;