const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
  title: {type: String, required: true},
  //UserId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Board', BoardSchema);