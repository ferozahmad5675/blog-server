import express, { json } from "express";
import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import routes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://ferozkhalil:feroz5675@cluster0.gazk0yl.mongodb.net/blog"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("listning to the port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/routes/api", routes);
