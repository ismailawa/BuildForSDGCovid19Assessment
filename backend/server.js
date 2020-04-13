const express = require('express');
const fs = require('fs');
const path = require('path');
const responseTime = require('response-time');
const { routes } = require('./api/routes/estimator');

const app = express();
const port = process.env.PORT || '3000';


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(responseTime((req, res, time) => {
  res.on('finish', () => {
    const stat = 
    (`${req.method}\t\t/api/v1/on-covid-19${req.url}\t\t${res.statusCode}\t\t${Math.floor(time)}ms\n`);
    fs.appendFile('apilog.txt', stat, (error) => res.end({ error }));
  });
}));

app.use('/api/v1/on-covid-19', routes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
});
