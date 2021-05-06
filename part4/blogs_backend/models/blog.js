const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  author: String,
  url: {
      type: String,
      required: true,
      unique: true
  },
  likes: Number,
});

blogSchema.set("toJSON", {
  transform:
    (document, returnedObj) => {
      returnedObj.id = returnedObj._id.toString();
      delete returnedObj._id;
      delete returnedObj.__v;
    },
});

module.exports = mongoose.model("Blog", blogSchema);