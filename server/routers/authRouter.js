const { Router } = require('express');

const router = Router();
const authController = require('../controllers/authController');
const { routeLog } = require('../utilities');

router.post('/signup',
  (_req, _res, next) => routeLog(`Signup request received.`, next),
  authController.handleDetails,
  authController.attemptSignup,
  authController.startSession,
  (_, res) => res.status(200).json({username: res.locals.username})
);

router.post('/login',
  (_req, _res, next) => routeLog(`Login request received.`, next),
  authController.handleDetails,
  authController.attemptLogin,
  authController.startSession,
  (_, res) => res.status(200).json({username: res.locals.username})
);

router.get('/',
  (_req, _res, next) => routeLog(`Authorization request received.`, next),
  authController.authorize,
  (_, res) => res.status(200).json({username: res.locals.username})
)

router.get('/logout',
  (_req, _res, next) => routeLog(`Logout request received.`, next),
  authController.logout,
  (_, res) => res.sendStatus(200)
);

module.exports = router;