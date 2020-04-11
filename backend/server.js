const express = require('express');
const fs = require('fs');
const responseTime = require('response-time');
const { routes } = require('./api/routes/estimator');

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(responseTime((req, res, time) => {
  const stat = (`${req.method}\t\t/api/v1/on-covid-19${req.url}\t\t${res.statusCode}\t\t${time} ms\n`).toLowerCase();
  if (req.url !== '/logs') fs.appendFile('apilog.txt', stat, (error) => res.end({ error }));
}));

app.use('/api/v1/on-covid-19', routes);

app.get('/', (req, res) => (res.send({ home: 'This is the home page..' })));

app.listen(port, () => {
});
