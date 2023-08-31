const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteAllBlogs,
  deleteSingleBlog,
  getByCategory,
} = require("../controllers/blogController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/all", getAllBlogs);
router.get("/category/:category", getByCategory);
router.get("/:slug", getSingleBlog);
router.post("/create", createBlog);
router.put("/:slug", editBlog);
router.delete("/all", deleteAllBlogs);
router.delete("/:slug", deleteSingleBlog);

module.exports = router;
