const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

blogSchema.statics.uniqueSlug = async function (proposedSlug) {
  let slug = proposedSlug;
  let counter = 1;
  while (true) {
    const existingBlog = await this.findOne({ slug });
    if (!existingBlog) {
      return slug;
    }
    slug = `${slug}-${counter}`;
    counter++;
  }
};

module.exports = mongoose.model("Blog", blogSchema);
