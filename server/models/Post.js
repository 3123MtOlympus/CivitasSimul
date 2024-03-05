const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema ({

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
    comments: [{
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
    }],
});

const Post = model('Post', postSchema);

module.exports = Post;