import express from "express";
import dotenv from "dotenv";
import bookmodel from "../model/bookmodel.js";

dotenv.config();
const bookRouter = express.Router();

bookRouter.post("/post", async (req, res) => {
  try {
    const { title, author, genre, year, description } = req.body;
    console.log("-----req.body----", req.body);
    const book = new bookmodel({
      title,
      author,
      genre,
      year,
      description,
    });
    await book.save();
    res.status(201).json({ meassge: "book is added succssfully" });
  } catch (error) {
    res.status(500).json({ meassge: "error adding to book" });
  }
});

// ---- Get all books ----
bookRouter.get("/getAll", async (req, res) => {
  try {
    const bookItems = await bookmodel.find();
    console.log(bookItems);
    res.json(bookItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ---- Delete a book ----
bookRouter.delete("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await bookmodel.findOneAndDelete({ _id: bookId });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    console.log(deletedBook);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
});

// ---- Update a book ----
bookRouter.put("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const updatedBook = await bookmodel.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
});

bookRouter.post("/multipleData", async (req, res) => {
  try {
    const book = req.body;

    if (!Array.isArray(book) || book.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    await bookmodel.insertMany(book);

    res.status(201).json({ message: "Products added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding products", error: error.message });
  }
});
export default bookRouter;
