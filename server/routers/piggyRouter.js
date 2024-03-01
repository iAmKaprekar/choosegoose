const { Router } = require('express');

const router = Router();
const piggyController = require('../controllers/piggyController');

router.post('/', piggyController.addEntry, (_, res) => {
  res.status(200).json({});
})

module.exports = router;