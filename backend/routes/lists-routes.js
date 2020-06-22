const express = require('express');

const listsControllers = require('../controllers/lists-controllers')

const router = express.Router();

router.get('/lists', listsControllers.getLists)

router.get('/lists/:bid', listsControllers.getBoardLists)

router.get('/lists/:lid', listsControllers.getListById)

router.post('/lists/:bid',listsControllers.createList )

router.delete('/lists/:lid', listsControllers.deleteList)

module.exports = router;