const express = require('express');

const router = express.Router();

// @ts-ignore
router.post('/', (req, res) => {
  res.json({
    name: 'ismailawa'
  });
});

module.exports = router;
