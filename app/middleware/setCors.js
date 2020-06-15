const ALLOWED_ORIGINS = [
  'http://localhost:8000',
];

module.exports = (req, res, next) => {
  const origin = req.headers.origin;

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Credentials', true);
  } else {
    res.set(
      'Access-Control-Allow-Origin',
      'http://localhost:8000'
    );
  }

  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Template-Id, From-Email');
  // cache preflight response for 3600s
  res.set('Access-Control-Max-Age', '3600');

  // Send response to OPTIONS requests and terminate the function execution
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  try {
    next();
  } catch (err) {
    console.error(err);
  }
};
