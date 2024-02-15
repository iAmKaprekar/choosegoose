const { Router } = require('express');

const router = Router();
const authController = require('../controllers/authController');

router.post('/signup',
  authController.handleDetails,
  authController.attemptSignup,
  authController.startSession,
  (_, res) => res.sendStatus(200)
);

router.post('/login',
  authController.handleDetails,
  authController.attemptLogin,
  authController.startSession,
  (_, res) => res.sendStatus(200)
);

router.get('/',
  authController.authorize,
  (_, res) => res.sendStatus(200)
)

router.get('/logout',
  authController.logout,
  (_, res) => res.sendStatus(200)
);

module.exports = router;