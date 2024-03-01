const controller = {};

const db = require('../models/piggyModel');

controller.addEntry = async(req, res, next) => {
  try {
    const { username, coin } = req.body;
    if (username !== 'Kaprekar') {
      return next({
        status: 403,
        log: `Unrecognized client attempted to deposit coin.`,
        message: {err: 'Access denied.'}
      });
    }
    const addQuery = `INSERT INTO Entries (coin) VALUES ($1);`;
    await db.query(addQuery, [coin]);
    return next();
  } catch (err) {
    return next({
      log: `Error caught in piggyController.addEntry: ${err}`,
      message: {err: 'Unknown error occurred in depositing coin.'}
    })
  }
}

module.exports = controller;