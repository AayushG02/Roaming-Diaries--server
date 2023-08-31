const Blog = require("../models/blogModel");
const slugify = require("slugify");

const createBlog = async (req, res) => {
  const { title, desc, imgUrl, categories } = req.body;
  const uid = req.user._id;
  const slug = slugify(title, { replacement: "-", lower: true });

  const uniqueSlug = await Blog.uniqueSlug(slug);

  try {
    const blog = await Blog.create({
      uid,
      slug: uniqueSlug,
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
  const slug = req.params.slug;
  try {
    const blog = await Blog.find({ slug });
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const editBlog = async (req, res) => {
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOneAndUpdate({ slug }, { ...req.body });
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
  const slug = req.params.slug;
  try {
    const blog = await Blog.deleteOne({ slug });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const blogs = await Blog.find({ categories: category });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ error });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getByCategory,
  editBlog,
  deleteAllBlogs,
  deleteSingleBlog,
};
