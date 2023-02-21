import mongoose from "mongoose";
import { blogModel } from "../models/blog.js";
import { userModel } from "../models/user.js";

export const getBlogs = async (req, res) => {
  try {
    const blog = await blogModel.find().populate("user");

    if (!blog) {
      res.status(400).json("No blogs available");
    } else {
      return res.status(200).json({ blog });
    }
  } catch (error) {
    res.status(500).json("error");
  }
};

// Add blogs

export const addBlog = async (req, res) => {
  const { user } = req.body;
  const newBlog = new blogModel(req.body);
  const existUser = await userModel.findById(user);

  try {
    if (!existUser) {
      res.status(400).json("No user Find By this id");
    }
  } catch (error) {
    res.status(400).json(error);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existUser.blogs.push(newBlog);
    await existUser.save({ session });
    await session.commitTransaction();

    res.status(200).json({ newBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update a blog

export const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, description } = req.body;
  try {
    const updatedBlog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        title,
        description,
      },
      { new: true }
    );
    if (updatedBlog) {
      res.status(200).json({ updatedBlog });
    } else {
      res.status(400).json("blog can't be updated");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//Delete a blog

export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await blogModel.findByIdAndRemove(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    if (blog) {
      res.status(200).json({ message: "Delete Suceesfull" });
    } else {
      res.status(400).json("blog can't be Deleted");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get user by id

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const userBlogs = await userModel.findById(id).populate("blogs");
    if (!userBlogs) {
      res.status(404).json("blog not found");
    } else {
      res.status(200).json({ user: userBlogs });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get blog by id
export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await blogModel.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};
