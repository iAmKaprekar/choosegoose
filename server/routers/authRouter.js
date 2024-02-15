const { Router } = require('express');

const router = Router();
const authController = require('../controllers/authController');

router.post('/signup', (_, res) => {
  console.log('Hit signup path');
  res.status(200).json({success: true})
})

router.post('/login', (_, res) => {

})

router.post('/logout', (_, res) => {

})

module.exports = router;