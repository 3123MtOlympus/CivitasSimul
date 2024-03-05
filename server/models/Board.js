const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// board schema
const boardSchema = new Schema ({
    boardName: { // future development for different boards
      type: String
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
});

const Board = model('Board', boardSchema);

module.exports = Board;