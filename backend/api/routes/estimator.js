const express = require('express');
const { Controller } = require('../controllers/estimator');

const router = express.Router();

router.post('/', Controller.estimatorWithOutParams);

router.post('/:format', Controller.estimatorWithParams);

router.get('/log', Controller.estimatorLog);

exports.routes = router;
