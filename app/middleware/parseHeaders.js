function parseHeaders(req, res, next) {
  console.log(req.headers);

  try {
    const {
      headers: {
        'template-id': templateId,
        'from-email': fromEmail,
        origin
      }
    } = req;
    
    if (!templateId || !fromEmail) throw new Error();
    res.locals.TemplateId = templateId;
    res.locals.From = fromEmail;
    res.locals.origin = origin;
  } catch (err) {
    console.error('Failed extract template information from headers.');
  }

  next();
}

module.exports = parseHeaders;
