const fs = require('fs');
const jsonToxml = require('jsontoxml');
const { ProcessData } = require('../../../src/process');

const estimatorWithParams = (req, res) => {
  const { format } = req.params;
  const { body } = req;
  const data = ProcessData(body);
  if (format.toLowerCase() === 'json') {
    console.log(req.body);
    return res.json(data);
  }

  if (format.toLowerCase() === 'xml') {
    res.setHeader('content-type', 'application/xml');
    return res.send(jsonToxml(data));
  }

  return res.status(404).json({ response: 'Please use /json or /xml' });
};

const estimatorWithOutParams = (req, res) => {
  const { body } = req;
  const data = ProcessData(body);
  return res.json(data);
};

const estimatorLog = (req, res) => {
  try {
    const data = fs.readFileSync('apilog.txt');
    res.setHeader('Content-Type', 'text/plain');
    return res.send(data.toString().trim());
  } catch (error) {
    return res.send({ error });
  }
};

exports.Controller = { estimatorWithParams, estimatorWithOutParams, estimatorLog };
