const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const toolSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  imgUrl: {
    type: String,
  },
});

const Tool = model('Tool', toolSchema);

module.exports = Tool;
