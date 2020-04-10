const express = require('express');
const { routes } = require('./api/routes/estimator');

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', routes);

app.get('/', (req, res) => (res.send({ home: 'This is the home page..' })));

app.listen(port, () => {
});
