const express = require('express');

const boardsControllers = require('../controllers/boards-controllers')

const router = express.Router();

router.get('/boards', boardsControllers.getBoards)

router.get('/boards/:bid', boardsControllers.getBoardById)

router.post('/boards',boardsControllers.createBoard )

router.delete('/boards/:bid', boardsControllers.deleteBoard)

module.exports = router;