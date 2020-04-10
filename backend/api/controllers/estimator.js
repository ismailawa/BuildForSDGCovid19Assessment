const jsonToxml = require('jsontoxml');
const { ProcessData } = require('../../../src/process');

const estimatorWithParams = (req, res) => {
  const { format } = req.params;
  const { body } = req;
  const data = ProcessData(body);
  if (format.toLowerCase() === 'json') {
    return res.json(data);
  }

  if (format.toLowerCase() === 'xml') {
    return res.send(jsonToxml(data));
  }

  return res.status(404).json({ response: 'bad request' });
};

const estimatorWithOutParams = (req, res) => {
  const { body } = req;
  const data = ProcessData(body);
  return res.json(data);
};

const estimatorLog = (req, res) => {
  res.json({ status: 'End point is working' });
};

exports.Controller = { estimatorWithParams, estimatorWithOutParams, estimatorLog };
