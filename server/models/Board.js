const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// board schema
const boardSchema = new Schema ({
    boardName: {
      type: String
    },
    posts: [
      {
        title: { 
          type: String,
          required: true,
        },
        postText: {
          type: String,
          required: "You can't leave this empty!",
          minlength: 1,
          maxlength: 280,
          trim: true,
        },
        postImg: {
          type: String,
        },
        postAuthor: {
          type: String,
          required: true,
          trim: true,
        },
        datePosted: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
        comments: [
          {
            commentText: {
              type: String,
              required: true,
              minlength: 1,
              maxlength: 280,
            },
            commentAuthor: {
              type: String,
              required: true,
              trim: true,
            },
            datePosted: {
              type: Date,
              default: Date.now,
              get: (timestamp) => dateFormat(timestamp),
            },
          },
        ],
      },
    ],
    
});

const Board = model('Board', boardSchema);

module.exports = Board;