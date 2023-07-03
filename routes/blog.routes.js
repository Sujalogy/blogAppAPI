const express = require('express');
const blogRouter = express.Router();

const { auth, authorizedUser } = require("../middlewares/auth.middleware");
const { createBlog, updateBlog, getAllBlog, deleteBlog } = require('../controller/blog.controller');

blogRouter.post("/", auth, createBlog)
blogRouter.get("/", auth, getAllBlog)
blogRouter.put("/:blogId", auth,authorizedUser, updateBlog)
blogRouter.delete("/:blogId", auth,authorizedUser, deleteBlog)


module.exports = {
    blogRouter
}

