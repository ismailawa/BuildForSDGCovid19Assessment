const express = require('express');
const estimatorApi = require('./api/routes/estimator');

const app = express();

app.use('/api/v1/on-covid-19', estimatorApi);

app.listen(3000, () => {
});
