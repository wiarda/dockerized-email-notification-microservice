function parseHeaders(req, res, next) {
  console.log(req.headers);

  try {
    const {
      headers: {
        'template-id': templateId,
        'from-email': fromEmail,
        'to-email': toEmail,
        origin
      }
    } = req;
    
    if (!templateId || !fromEmail) throw new Error();
    res.locals.TemplateId = templateId;
    res.locals.From = fromEmail;
    res.locals.origin = origin;
    
    if (toEmail !== undefined) res.locals.To = toEmail;
  } catch (err) {
    console.error('Failed extract template information from headers.');
  }

  next();
}

module.exports = parseHeaders;
