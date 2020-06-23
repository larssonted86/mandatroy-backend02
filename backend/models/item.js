const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  desc: {type: String},
  created: {type: Date, default: Date.now},
  listId: {type: mongoose.Types.ObjectId, required: true, ref: 'List'},
  boardId: {type: mongoose.Types.ObjectId, required: true, ref: 'Board'},
});

module.exports = mongoose.model('Item', ItemSchema);