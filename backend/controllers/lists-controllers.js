const HttpError = require('../models/http-error')
const List = require('../models/list')

const getLists = async (req,res,next) => {
  const lists = await List.find().exec()
  res.json(lists)
};

const getBoardLists = async (req,res,next) => {
  const boardId = req.params.bid;
  let lists; 
  try{
    lists = await List.find({boardId: boardId})
  }catch(err){
    const error = new HttpError(
      'Failed to find lists, please try again',
      500
    );
    return next(error);
  }

  
  
  res.json(lists);
  
}

const getListById = async (req,res,next) => {
  const listId = req.params.lid;
  let list;
  try{
    list = await List.findById(listId)
  }catch(err){
    const error = new HttpError(
      'Failed to find list, please try again',
      500
    );
    return next(error);
  }

  if(!list){
    const error = new HttpError(
      'Could not find a list for the provided id', 
      404
      );    
    return next(error);
  }
  
  res.json({list: list.toObject( {getters: true}) });
};

const createList = async (req,res,next) => {
  const boardId = req.params.bid
  const {title,} = req.body;
  const createdList = new List({
    title: title,
    boardId: boardId,
  })

  
  try{
    await createdList.save();
  }catch(err){
    const error = new HttpError(
      'Failed to create list, please try again',
      500
    );
    return next(error);
  }  

  res.status(201).json({list: createdList})
};

const deleteList = async (req,res,next) => {
  const listId = req.params.lid
  let list;
  try{
   list =  await List.findByIdAndDelete(listId)
  }catch(err){
    const error = new HttpError(
      'Failed to delete list, please try again',
      500
    );
    return next(error);
  }
  res.status(200).json({message: 'Deleted List'})
};

exports.getLists = getLists;
exports.getBoardLists = getBoardLists;
exports.getListById = getListById;
exports.createList = createList;
exports.deleteList = deleteList;
