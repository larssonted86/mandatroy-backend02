const HttpError = require('../models/http-error')
const Item = require('../models/item')

const getItems = async (req,res,next) => {
  const items = await Item.find().exec()
  res.send(items)
};

const getListItems = async (req,res,next) => {
  const listId = req.params.lid
  let items; 
  try{
    items = await Item.find({listId: listId})
  }catch(err){
    const error = new HttpError(
      'Failed to find lists, please try again',
      500
    );
    return next(error);
  }

  
  
  res.json(items);
};

const getItemById = async (req,res,next) => {
  const itemId = req.params.iid;
  let item;
  try{
    item = await Item.findById(itemId)
  }catch(err){
    const error = new HttpError(
      'Failed to find item, please try again',
      500
    );
    return next(error);
  }

  if(!item){
    const error = new HttpError(
      'Could not find a item for the provided id', 
      404
      );    
    return next(error);
  }
  
  res.json({item: item.toObject( {getters: true}) });
};

const createItem = async (req,res,next) => {
  const listId = req.params.lid
  const {title, desc} = req.body;
  const createdItem = new Item({
    title: title,
    desc: desc,
    listId: listId,
    created: Date.now(),
  })
    
  try{
    await createdItem.save();
  }catch(err){
    const error = new HttpError(
      'Failed to create item, please try again',
      500
    );
    return next(error);
  }  

  res.status(201).json({item: createdItem})
};

const deleteItem = async (req,res,next) => {
  const itemId = req.params.iid
  let item;
  try{
   item =  await Item.findByIdAndDelete(itemId)
  }catch(err){
    const error = new HttpError(
      'Failed to delete item, please try again',
      500
    );
    return next(error);
  }
  res.status(200).json({message: 'Deleted Item'})
};

const MoveItem = async (req,res,next) => {
  const itemId = req.params.iid
  let item;
  try{
    console.log(req.body)
   item =  await Item.findByIdAndUpdate(itemId, {listId: req.body.listId})
  }catch(err){
    const error = new HttpError(
      'Failed to update item, please try again',
      500
    );
    return next(error);
  }
  res.status(200).json({message: 'Updated Item'})
};

exports.getItems = getItems;
exports.getListItems = getListItems;
exports.getItemById = getItemById;
exports.createItem = createItem;
exports.deleteItem = deleteItem;
exports.MoveItem = MoveItem;