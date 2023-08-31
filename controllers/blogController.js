const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  const { title, desc, imgUrl, categories } = req.body;
  try {
    const uid = req.user._id;
    const blog = await Blog.create({
      uid,
      title,
      desc,
      imgUrl,
      categories,
    });
    res.status(200).json({ blog });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  const uid = req.user._id;
  try {
    const blogs = await Blog.find({ uid }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getSingleBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.find({ _id: id });
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const editBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found!" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const deleteAllBlogs = async (req, res) => {
  const uid = req.user._id;
  try {
    const blogs = await Blog.deleteMany({ uid });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteSingleBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.deleteOne({ _id: id });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteAllBlogs,
  deleteSingleBlog,
};
