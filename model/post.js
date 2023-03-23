const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true // remove leading/trailing white spaces

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
        trim: true // remove leading/trailing white spaces

      },
      date: {
        type: Date,
        default: Date.now,
      },
      _id:false
    },
  ],
});

Post= mongoose.model('Post', postSchema);

module.exports = Post