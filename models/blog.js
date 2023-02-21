import mongoose from "mongoose";

const blog = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const blogModel = mongoose.model("blog", blog);
