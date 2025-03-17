import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use("/users", userRouter);
app.use("/book", bookRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log("server is running port 5001");
    console.log("databse is conneted");
  } catch (error) {
    console.log("error--------------- ", error);
    console.log("erorr is ");
  }
});
