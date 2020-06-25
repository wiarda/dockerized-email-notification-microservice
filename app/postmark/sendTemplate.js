const client = require('./client');
const { compose, mergeLeft, pick, converge, objOf, merge } = require('ramda');

// List of additional valid body properties for a Postmark sendEmailWithTemplate request
const BODY_TAGS = [
  "TemplateAlias",
  "InlineCss",
  "Cc",
  "Bcc",
  "Tag",
  "ReplyTo",
  "Headers",
  "TrackOpens",
  "TrackLinks",
  "Attachments",
  "Metadata",
];

/**
 * Takes body values and formats them into a Postmark template request.
 * All valid body properties will be included in the main body of the request.
 */
const preparePostmarkRequest = converge(merge, [objOf("TemplateModel"), pick(BODY_TAGS)]);

/**
 * Combines required template option fields with form-specific fields
 * @param {{}} requiredFields 
 * @param {String} requiredFields.TemplateId 
 * @param {String} requiredFields.From 
 * @param {String} requiredFields.To 
 * @param {{}} formEntries
 * @returns {TemplateOptions}
 */
const parseTemplateOptions = (requiredFields, formEntries) => mergeLeft(requiredFields, preparePostmarkRequest(formEntries));

/**
 * Sends a Postmark template
 * @param {TemplateOptions} templateOptions
 * @param {String} templateOptions.TemplateId template ID on your Postmark server
 * @param {String} templateOptions.From from email
 * @param {String} templateOptions.To email to send to
 * @param {{}} templateOptions.TemplateModel Object containing template variables
 * https://github.com/wildbit/postmark.js/wiki/Templates 
 */
const send = templateOptions => client.sendEmailWithTemplate(templateOptions);

const sendTemplate = compose(send, parseTemplateOptions);

module.exports = sendTemplate;
