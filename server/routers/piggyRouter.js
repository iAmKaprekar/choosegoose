const { Router } = require('express');

const router = Router();

const authController = require('../controllers/authController');
const piggyController = require('../controllers/piggyController');

router.post('/', authController.attemptLogin, piggyController.addEntry, (_, res) => {
  res.status(200).json({});
})

module.exports = router;