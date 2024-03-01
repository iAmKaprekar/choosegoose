const { Router } = require('express');

const router = Router();
const piggyController = require('../controllers/piggyController');

router.get('/', piggyController.isComplete, (_, res) => {
  res.status(200).json({complete: res.locals.complete});
})

router.post('/', piggyController.addEntry, (_, res) => {
  res.status(200).json({});
})

module.exports = router;