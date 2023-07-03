const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = {
    BlogModel
};
