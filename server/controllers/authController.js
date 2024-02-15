const controller = {};

const AUTH_KEY = process.env.AUTH_KEY;
const WORK_FACTOR = process.env.WORK_FACTOR;

const { datedLog } = require('../dateHandler')

controller.handleDetails = async(req, res, next) => {
  try {
    next();
  } catch (err) {
    next({
      log: `Error caught in authController.handleDetails: ${err}`,
      message: {err: 'Unknown error occurred in handling user details.'}
    })
  }
}

controller.attemptSignup = async(req, res, next) => {
  try {
    next();
  } catch (err) {
    next({
      log: `Error caught in authController.attemptSignup: ${err}`,
      message: {err: 'Unknown error occurred in signup.'}
    })
  }
}

controller.attemptLogin = async(req, res, next) => {
  try {
    next();
  } catch (err) {
    next({
      log: `Error caught in authController.attemptLogin: ${err}`,
      message: {err: 'Unknown error occurred in login.'}
    })
  }
}

controller.startSession = async(req, res, next) => {
  try {
    next();
  } catch (err) {
    next({
      log: `Error caught in authController.startSession: ${err}`,
      message: {err: 'Unknown error occurred in session.'}
    })
  }
}

controller.authorize = async(req, res, next) => {
  try {
    next();
  } catch (err) {
    next({
      log: `Error caught in authController.authorize: ${err}`,
      message: {err: 'Unknown error occurred in authorization.'}
    })
  }
}

controller.logout = async(req, res, next) => {
  try {
    next();
  } catch (err) {
    next({
      log: `Error caught in authController.logout: ${err}`,
      message: {err: 'Unknown error occurred in logout.'}
    })
  }
}

module.exports = controller;