import mongoose from "mongoose";
import { userModel } from "../models/user.js";
import bcrypt, { genSalt } from "bcrypt";

// Getting all the users
export const getUser = async (req, res) => {
  let user;
  try {
    user = await userModel.find();
    if (!user) {
      res.status(400).json("User does not exist");
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// sign up

export const signUp = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      const salt = await bcrypt.genSalt(10);
      const hasPass = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name,
        password: hasPass,
        email,
        blog: [],
      });
      await newUser.save();
      res.status(200).json({ user: newUser });
    } else {
      res.status(200).json("User exist");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//Login Funtion
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      res.status(400).json("no user exist");
    }
    const isPassword = await bcrypt.compare(password, existUser.password);
    if (!isPassword) {
      res.status(400).json("password doest not matched");
    }
    return res.status(200).json({ user: existUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
