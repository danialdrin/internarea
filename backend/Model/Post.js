const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    uid: { type: String, required: true },
    name: String,
    photo: String,
  },
  caption: String,
  media: {
    type: [
      {
        url: String,
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
      },
    ],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [
      {
        user: {
          uid: String,
          name: String,
          photo: String,
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
  shares: {
    type: [
      {
        user: {
          uid: String,
          name: String,
          photo: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
