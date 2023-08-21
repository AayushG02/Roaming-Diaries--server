const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  const { title, desc, photo, categories } = req.body;
  try {
    const uid = req._id;
    const blog = await Blog.create({
      uid,
      title,
      desc,
      photo,
      categories,
    });
    res.status(200).json({ blog });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
