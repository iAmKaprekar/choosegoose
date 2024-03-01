const controller = {};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AUTH_KEY = process.env.AUTH_KEY;
const WORK_FACTOR = parseInt(process.env.WORK_FACTOR);

const { datedLog } = require('../utilities')

const db = require('../models/gooseModel');

controller.handleDetails = async(req, res, next) => {
  try {
    const { username, password } = req.body;
    datedLog(`Handling user details for "${username}"...`);
    const validUsernameCharacters = new Set('abcdefghijklmnopqrtstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(''));
    const validationError = (type, err) => {
      next({
        status: 400,
        log: `Invalid ${type} format for "${username}".`,
        message: { err }
      })
    }
    if (typeof username !== 'string') return validationError('username', 'Invalid username format.');
    if (typeof password !== 'string') return validationError('password', 'Invalid password format.');
    if (username.length > 32) return validationError('username', 'Username must not be longer than 32 characters.');
    if (username.length < 1) return validationError('username', 'Must provide a username.');
    for (const char of username) {
      if (!validUsernameCharacters.has(char)) return validationError('username', 'Username may only contain letters and numbers.');
    }
    if (password.length > 256) return validationError('password', 'Password must not be longer than 256 characters.');
    if (password.length < 8) return validationError('password', 'Password must be at least 8 characters long.');
    res.locals.password = await bcrypt.hash(password, WORK_FACTOR);
    return next();
  } catch (err) {
    return next({
      log: `Error caught in authController.handleDetails: ${err}`,
      message: {err: 'Unknown error occurred in handling user details.'}
    })
  }
}

controller.attemptSignup = async(req, res, next) => {
  try {
    const { username } = req.body;
    const { password } = res.locals;
    datedLog(`Attempting to signup with username "${username}"...`);
    const usernameQuery = `SELECT * FROM Users WHERE username=$1`;
    const conflictingUsers = await db.query(usernameQuery, [username])
    if (conflictingUsers.rows.length) {
      return next({
        status: 400,
        log: `Signup aborted -- account with username "${username}" already exists.`,
        message: {err: 'Account with requested username already exists.'}
      })
    }
    const newAccountQuery = `INSERT INTO Users (username, password) VALUES ($1, $2)`
    await db.query(newAccountQuery, [username, password]);
    return next();
  } catch (err) {
    return next({
      log: `Error caught in authController.attemptSignup: ${err}`,
      message: {err: 'Unknown error occurred in signup.'}
    })
  }
}

controller.attemptLogin = async(req, res, next) => {
  try {
    const { username, password } = req.body;
    const loginQuery = `SELECT "password" FROM Users WHERE username=$1`;
    const selectedUser = await db.query(loginQuery, [username]);
    if (selectedUser.rows.length) {
      const validPassword = await bcrypt.compare(password, selectedUser.rows[0].password);
      if (!validPassword) {
        return next({
          status: 400,
          log: `Login aborted -- incorrect password provided for user "${username}".`,
          message: {err: 'Invalid login details provided.'}
        })
      }
    } else {
      return next({
        status: 400,
        log: `Login aborted -- no user account exists with the name "${username}".`,
        message: {err: 'Invalid login details provided.'}
      })
    }
    return next();
  } catch (err) {
    return next({
      log: `Error caught in authController.attemptLogin: ${err}`,
      message: {err: 'Unknown error occurred in login.'}
    })
  }
}

controller.startSession = async(req, res, next) => {
  try {
    const { username } = req.body;
    datedLog(`Starting session for user "${username}"...`)
    const token = jwt.sign({ username }, AUTH_KEY);
    res.cookie('jwt', token, {httpOnly: true});
    res.locals.username = username;
    return next();
  } catch (err) {
    return next({
      log: `Error caught in authController.startSession: ${err}`,
      message: {err: 'Unknown error occurred in session.'}
    })
  }
}

controller.authorize = async(req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token === undefined) {
      next({
        status: 400,
        log: `Request denied -- no user token provided.`,
        message: {err: 'Missing user token.'}
      })
    }
    const user = jwt.verify(token, AUTH_KEY).username;
    if (user === undefined) {
      next({
        status: 400,
        log: `Request denied -- invalid user token provided.`,
        message: {err: 'Invalid user token.'}
      })
    }
    datedLog(`Request sender successfully identified as user "${user}"...`)
    res.locals.username = user;
    return next();
  } catch (err) {
    return next({
      log: `Error caught in authController.authorize: ${err}`,
      message: {err: 'Unknown error occurred in authorization.'}
    })
  }
}

controller.getId = async(req, res, next) => {
  try {
    const { username } = res.locals;
    datedLog(`Acquiring ID for user "${username}"...`);
    const userIdQuery = `SELECT * FROM Users WHERE username=$1`
    const userIdResponse = await db.query(userIdQuery, [username]);
    const userId = userIdResponse.rows[0]?.user_id;
    res.locals.userId = userId;
    return next();
  } catch (err) {
    return next({
      log: `Error caught in authController.getId: ${err}`,
      message: {err: 'Unknown error occurred in finding user ID.'}
    })
  }
}

controller.logout = async(req, res, next) => {
  try {
    res.clearCookie('jwt');
    return next();
  } catch (err) {
    return next({
      log: `Error caught in authController.logout: ${err}`,
      message: {err: 'Unknown error occurred in logout.'}
    })
  }
}

module.exports = controller;