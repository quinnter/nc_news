exports.handle404 = (err, req, res, next) => {
  const codes = { 404: "Route Not Found" }
  if (codes[err.code]) res.status(404).send({msg: codes[err.code]})
  else next(err);
}

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};

exports.handle400 = (err, req, res, next) => {
  const codes = { 
    // 400: "Bad Request", 
    '42703': "Undefined Column",
    '22P02': "Invalid ID"  
  }
  if (codes[err.code]) res.status(400).send({msg: codes[err.code]})
  else next(err);
}

