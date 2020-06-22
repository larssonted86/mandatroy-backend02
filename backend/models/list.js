const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
  title: {type: String, required: true},
  boardId: {type: mongoose.Types.ObjectId, required: true, ref: 'Board'},
  });

module.exports = mongoose.model('List', ListSchema);