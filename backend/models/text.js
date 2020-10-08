const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Text', textSchema);