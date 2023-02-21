import express from "express";
import {
  addBlog,
  deleteBlog,
  getBlogs,
  getById,
  getUserById,
  updateBlog,
} from "../controller/blogCtr.js";
import { getUser, login, signUp } from "../controller/userCtr.js";

const routes = express.Router();

routes.get("/", getUser);
routes.post("/signup", signUp);
routes.post("/login", login);
routes.get("/blog", getBlogs);
routes.post("/addblog", addBlog);

routes.put("/updateblog/:id", updateBlog);
routes.delete("/delete/:id", deleteBlog);
routes.get("/getbyid/:id", getUserById);
routes.get("/:id", getById);

export default routes;
