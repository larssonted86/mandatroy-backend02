const HttpError = require('../models/http-error')
const Board = require('../models/board')
const List = require('../models/list')
const Item = require('../models/item')


const getBoards = async (req,res,next) => {
  const boards = await Board.find().exec()
  res.send(boards)
};

const getBoardById = async (req,res,next) => {
  const boardId = req.params.bid;
  let board;
  try{
    board = await Board.findById(boardId)
  }catch(err){
    const error = new HttpError(
      'Failed to find board, please try again',
      500
    );
    return next(error);
  }

  if(!board){
    const error = new HttpError(
      'Could not find a board for the provided id', 
      404
      );    
    return next(error);
  }
  
  res.json({board: board.toObject( {getters: true}) });
};

const createBoard = async (req,res,next) => {
  const {title} = req.body;
  const createdBoard = new Board({
    title: title
  })  
  try{
    await createdBoard.save();
  }catch(err){
    const error = new HttpError(
      'Failed to create board, please try again',
      500
    );
    return next(error);
  }  

  res.status(201).json({board: createdBoard})
};

const deleteBoard = async (req,res,next) => {
  const boardId = req.params.bid
  let board;
  try{
   board =  await Board.deleteMany({_id: boardId})
   list =  await List.deleteMany({boardId: boardId})
   item =  await Item.deleteMany({boardId: boardId})

  }catch(err){
    const error = new HttpError(
      'Failed to delete board, please try again',
      500
    );
    return next(error);
  }
  res.status(200).json({message: 'Deleted Board'})
};

exports.getBoards = getBoards;
exports.getBoardById = getBoardById;
exports.createBoard = createBoard;
exports.deleteBoard = deleteBoard;