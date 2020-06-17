const express = require('express');
const { mergeLeft, prop, objOf, compose } = require('ramda');
const { 
  setCors,
  parseHeaders,
} = require('./middleware');
const sendTemplate = require('./postmark/sendTemplate');
const validate = require('./validation/validation');

const getEmailField = x => x.email || x.Email;
const mergeEmailField = requiredFields => compose(mergeLeft(requiredFields), objOf('To'), getEmailField);

const app = express();
app.use(setCors, parseHeaders, express.json(), express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  console.log('request received');

  try {
    // get form values
    const formEntries = req.body;

    // convert form's email field into To field that is required by Postmark's template API
    const requiredFields = mergeEmailField(res.locals)(formEntries);
    // console.log('requiredFields:', requiredFields);

    // validate

    // TODO: switch to async
    return sendTemplate(requiredFields, formEntries);

    // return
  } catch (error) {
    console.log(error);

    // return error notice
  }

  return res.sendStatus(200);
});

module.exports = app;
