const controller = {};

const { datedLog } = require('../utilities');

const db = require('../models/gooseModel');

controller.validateList = async(req, res, next) => {
  try {
    const { listId } = req.params;
    const { userId, username } = res.locals;
    datedLog(`Validating user "${username}" has ownership of list with ID of ${listId}...`);
    const idQuery = `SELECT user_id FROM Lists WHERE list_id=$1`;
    const idResponse = await db.query(idQuery, [listId]);
    if (idResponse.rows[0].user_id !== userId) {
      return next({
        status: 400,
        log: `Aborted validating list -- "${username}" does not have access rights to list with ID ${listId}.`,
        message: {err: 'Client does not have access to that list.'}
      });
    }
    res.locals.listId = listId;
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
    const validationError = (log, message) => {
      next({
        status: 400,
        log: `Aborted creating new list "${name}" for "${username}" -- ${log}`,
        message: {err: message}
      });
    }
    if (typeof name !== 'string') return validationError(
      'received improperly formatted list name.',
      'List must have a properly formatted name.'
    );
    if (typeof size !== 'number') return validationError(
      'received improperly formatted size.',
      'List must have a properly formatted size.'
    );
    if (!name.length) return validationError(
      'received empty list name.',
      'List must be given a name.'
    );
    if (name.length > 50) return validationError(
      'received invalid list name length.',
      'List name must be no more than 50 characters.'
    );
    if (size < 2) return validationError(
      `${size ? 'only received 1 item' : 'received no items'}.`,
      'List must contain at least two items.'
    );
    if (size > 10000) return validationError(
      `received invalid list size.`,
      'List must not contain more than 10000 items.'
    );
    const createListQuery = `
      INSERT INTO Lists 
      (user_id, name, size, complete, steps, progress)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING list_id;
    `
    const createListResponse = await db.query(createListQuery, [userId, name, size, 0, 0, 0]);
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
      SELECT name, size, steps, complete, progress, list_id
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
    const { username, listId } = res.locals;
    datedLog(`Loading list with ID ${listId} for user "${username}"...`);
    const listQuery = `SELECT name, steps, complete, data, progress FROM Lists WHERE list_id=$1`;
    const listResponse = await db.query(listQuery, [listId]);
    res.locals.list = listResponse.rows[0];
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
    const { name, data, complete, steps, progress } = req.body;
    const { username, listId } = res.locals;
    datedLog(`Attemping to save data in list "${name}" for "${username}"...`);
    const saveQuery = `UPDATE Lists SET data = $1, complete=$2, steps=$3, progress=$4 WHERE list_id=$5`;
    await db.query(saveQuery, [data, complete ? 1 : 0, steps || 0, progress || 0, listId]);
    res.locals.name = name;
    return next();
  } catch (err) {
    return next({
      log: `Error caught in listController.saveList: ${err}`,
      message: {err: 'Unknown error occurred in saving list.'}
    })
  }
}

controller.deleteList = async(req, res, next) => {
  try {
    const { username, listId } = res.locals;
    datedLog(`Attemping to delete list with ID ${listId} for "${username}"...`);
    const deleteQuery = `DELETE FROM Lists WHERE list_id=$1`;
    await db.query(deleteQuery, [listId]);
    return next();
  } catch (err) {
    return next(
      {
        log: `Error caught in listController.deleteList: ${err}`,
        message: {err: 'Unknown error occurred in deleting list.'}
      }
    );
  }
}

module.exports = controller;