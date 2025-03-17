import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
  description: String,
});

const bookmodel = mongoose.model("Book", bookSchema);
export default bookmodel;
