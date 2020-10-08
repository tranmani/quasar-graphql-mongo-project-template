const mongoose = require('mongoose');

const xmlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  xmin: {
    type: Number,
    required: true
  },
  ymin: {
    type: Number,
    required: true
  },
  xmax: {
    type: Number,
    required: true
  },
  ymax: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('XML', xmlSchema);