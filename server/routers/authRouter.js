const { Router } = require('express');

const router = Router();
const authController = require('../controllers/authController');
const { routeLog } = require('../utilities');

router.post('/signup',
  (_, res, next) => routeLog(`Signup request received...`, next),
  authController.handleDetails,
  authController.attemptSignup,
  authController.startSession,
  (_, res, next) => routeLog(`Successful signup for new user "${res.locals.username}"!`, next),
  (_, res) => res.status(200).json({username: res.locals.username})
);

router.post('/login',
  (_, res, next) => routeLog(`Login request received...`, next),
  authController.handleDetails,
  authController.attemptLogin,
  authController.startSession,
  (_, res, next) => routeLog(`Successful login for existing user "${res.locals.username}"!`, next),
  (_, res) => res.status(200).json({username: res.locals.username})
);

router.get('/',
  (_, res, next) => routeLog(`Authorization request received...`, next),
  authController.authorize,
  (_, res, next) => routeLog(`Successful authorization for existing user "${res.locals.username}"!`, next),
  (_, res) => res.status(200).json({username: res.locals.username})
)

router.get('/logout',
  (_, res, next) => routeLog(`Logout request received...`, next),
  authController.logout,
  (_, res, next) => routeLog(`Successful logout for user.`, next),
  (_, res) => res.sendStatus(200)
);

module.exports = router;