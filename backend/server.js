const express = require('express');
const { routes } = require('./api/routes/estimator');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', routes);

app.listen(3000, () => {
});
