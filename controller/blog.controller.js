const { BlogModel } = require("../models/blog.model");

const createBlog = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.userId;
    try {
        const blog = new BlogModel({title, content, author});
        await blog.save();
        res.status(201).json({message : "blog has been added", blog: blog})
    } catch (error) {
        res.status(400).json({error : "error while logging in", error : error})
    }
}

const getAllBlog = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate("author", "name");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({error : "error while logging in", error : error})
    }
}

const updateBlog = async (req, res) => {
    const {blogId} = req.params;
    const {title, content} = req.body;
    const author = req.user.userId;
    try {
        const blog = await BlogModel.findOne({_id : blogId, author});
        if(!blog) {
            res.status(400).json({message : "Blog not found or unauthorised"})
        }
        blog.title = title;
        blog.content = content;
        await blog.save();
        res.status(200).json({message : "blog has been updated"})
    } catch (error) {
        res.status(400).json({error : "error while logging in", error : error})
    }
}

const deleteBlog = async (req, res) => {
    const {blogId} = req.params;
    const author = req.user.userId;
    try {
        const blog = await BlogModel.findOne({_id : blogId, author});

        if(!blog) {
            res.status(400).json({message : "Blog not found or unauthorised"})
        }
        await blog.remove();
        res.status(200).json({message : "blog has been deleted"});
    } catch (error) {
        res.status(400).json({error : "error while logging in", error : error})
    }
}

module.exports = {
    createBlog, getAllBlog, updateBlog, deleteBlog
}