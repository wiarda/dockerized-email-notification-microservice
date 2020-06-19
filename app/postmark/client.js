require('dotenv').config();
const postmark = require('postmark');
const { POSTMARK_KEY } = process.env;

module.exports = POSTMARK_KEY ? new postmark.ServerClient(POSTMARK_KEY) : x => new Error("Please supply a valid Postmark API key");
