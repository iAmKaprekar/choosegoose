const controller = {};

const { datedLog } = require('../utilities');

const db = require('../models/gooseModel');

controller.validateList = async(req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next({
      log: `Error caught in listController.validateList: ${err}`,
      message: {err: 'Unknown error occurred in validating user owns list.'}
    })
  }
}

controller.createList = async(req, res, next) => {
  try {
    const { name, size } = req.body;
    const { userId, username } = res.locals;
    datedLog(`Attemping to create new list "${name}" for "${username}"...`);
    if (typeof name !== 'string' || !name.length) {
      return next({
        status: 400,
        log: `Aborted creating new list "${name}" for "${username}" -- received improperly formatted list name.`,
        message: {err: 'List must have a properly formatted name.'}
      });
    }
    if (typeof size !== 'number') {
      return next({
        status: 400,
        log: `Aborted creating new list "${name}" for "${username}" -- received improperly formatted size.`,
        message: {err: 'List must have a properly formatted size.'}
      });
    }
    if (size < 2) {
      return next({
        status: 400,
        log: `Aborted creating new list "${name}" for "${username}" -- ${size ? 'only received 1 item' : 'received no items'}.`,
        message: {err: 'List must contain at least two items.'}
      });
    }
    const createListQuery = `
      INSERT INTO Lists 
      (user_id, name, size, complete, steps)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING list_id;
    `
    const createListResponse = await db.query(createListQuery, [userId, name, size, 0, 0]);
    const listId = createListResponse.rows[0].list_id;
    res.locals.listId = listId;
    res.locals.list = {
      name: name,
      size: size,
      steps: 0,
      complete: false,
      id: listId
    };
    return next();
  } catch (err) {
    return next({
      log: `Error caught in listController.createList: ${err}`,
      message: {err: 'Unknown error occurred in list creation.'}
    })
  }
}

controller.findLists = async(req, res, next) => {
  try {
    const { userId, username } = res.locals;
    datedLog(`Attemping to aquire all lists for user "${username}"...`);
    const listsQuery = `
      SELECT name, size, steps, complete, list_id
      FROM Lists
      WHERE user_id=$1;
    `;
    const listsResponse = await db.query(listsQuery, [userId]);
    const lists = listsResponse.rows;
    for (const list of lists) {
      list.complete = list.complete === '1';
    }
    res.locals.lists = lists;
    return next();
  } catch (err) {
    return next({
      log: `Error caught in listController.findLists: ${err}`,
      message: {err: 'Unknown error occurred in retrieving lists.'}
    })
  }
}

controller.loadList = async(req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next({
      log: `Error caught in listController.loadList: ${err}`,
      message: {err: 'Unknown error occurred in loading list.'}
    })
  }
}

controller.saveList = async(req, res, next) => {
  try {
    const { name, data } = req.body;
    const { username, listId } = res.locals;
    datedLog(`Attemping to save data in list "${name}" for "${username}"...`);
    const saveQuery = `UPDATE Lists SET data = $1 WHERE list_id=$2`;
    await db.query(saveQuery, [data, listId]);
    return next();
  } catch (err) {
    return next({
      log: `Error caught in listController.saveList: ${err}`,
      message: {err: 'Unknown error occurred in saving list.'}
    })
  }
}

module.exports = controller;