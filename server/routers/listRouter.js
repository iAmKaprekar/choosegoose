const { Router } = require('express');

const router = Router();
const listController = require('../controllers/listController');
const authController = require('../controllers/authController');
const { routeLog } = require('../utilities');

router.post('/',
  (_, res, next) => routeLog(`List creation request received...`, next),
  authController.authorize,
  authController.getId,
  listController.createList,
  listController.saveList,
  (_, res, next) => routeLog(`Successfully created new list "${res.locals.list.name}" for user "${res.locals.username}"!`, next),
  (_, res) => res.status(200).json({list: res.locals.list})
)

router.get('/',
  (_, res, next) => routeLog(`List selection request received...`, next),
  authController.authorize,
  authController.getId,
  listController.findLists,
  (_, res, next) => routeLog(`Successfully acquired lists for user "${res.locals.username}"!`, next),
  (_, res) => res.status(200).json({lists: res.locals.lists})
)

router.get('/:listId',
  (_, res, next) => routeLog(`List load request received...`, next),
  authController.authorize,
  authController.getId,
  listController.validateList,
  listController.loadList,
  (_, res, next) => routeLog(`Successfully loaded list "${res.locals.list.name}" for user "${res.locals.username}"!`, next),
  (_, res) => res.status(200).json({list: res.locals.list})
)

router.patch('/:listId',
  (_, res, next) => routeLog(`List save request received...`, next),
  authController.authorize,
  authController.getId,
  listController.validateList,
  listController.saveList,
  (_, res, next) => routeLog(`Successfully saved list "${res.locals.name}" for user "${res.locals.username}"!`, next),
  (_, res) => res.sendStatus(200)
)

module.exports = router;