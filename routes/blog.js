const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteAllBlogs,
  deleteSingleBlog,
} = require("../controllers/blogController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/all", getAllBlogs);
router.get("/:id", getSingleBlog);
router.post("/create", createBlog);
router.put("/:id", editBlog);
router.delete("/all", deleteAllBlogs)
router.delete("/:id", deleteSingleBlog)

module.exports = router;
