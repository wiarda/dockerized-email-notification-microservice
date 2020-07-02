const express = require('express');
const { mergeLeft, objOf, compose } = require('ramda');
const { 
  setCors,
  parseHeaders,
} = require('./middleware');
const sendTemplate = require('./postmark/sendTemplate');

const getEmailField = x => x.email || x.Email;
const mergeEmailField = requiredFields => compose(mergeLeft(requiredFields), objOf('To'), getEmailField);

const app = express();
app.use(setCors, parseHeaders, express.json(), express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  try {
    const formEntries = req.body;
    const requiredFields = mergeEmailField(res.locals)(formEntries);

    // TODO: Add server-side form validation

    await sendTemplate(requiredFields, formEntries);

    res.status(200)
    return res.send({ message: 'OK' });
  } catch (error) {
    console.error(error);
    // TODO: Split out error types
    return res.send({ status: 400, error })
  }
});

module.exports = app;
