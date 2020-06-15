require('dotenv').config();
const postmark = require('postmark');
const { POSTMARK_KEY } = process.env;

module.exports = new postmark.ServerClient(POSTMARK_KEY);
