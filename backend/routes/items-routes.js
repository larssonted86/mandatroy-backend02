const express = require('express');

const itemsControllers = require('../controllers/items-controllers')

const router = express.Router();

router.get('/items',
itemsControllers.getItems)

router.get('/items/:lid', itemsControllers.getListItems)

router.get('/items/:iid', itemsControllers.getItemById)

router.post('/items/:lid',itemsControllers.createItem )

router.delete('/items/:iid', itemsControllers.deleteItem)

router.patch('/items/move/:iid', itemsControllers.MoveItem)

router.patch('/items/update/:iid', itemsControllers.UpdateItem)

module.exports = router;