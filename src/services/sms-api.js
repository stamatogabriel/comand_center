const axios = require('axios');

const smsApi = axios.create({
    baseURL: process.env.SMS_API
});

module.exports = smsApi;

