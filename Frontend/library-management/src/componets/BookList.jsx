import { useEffect, useState } from "react";
import "./booklist.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch("https://library-management-system-e3hq.onrender.com/book/getAll")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((error) => console.error("Error loading books:", error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(value) ||
          book.author.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="booklist-container">
      <h1 className="booklist-title">📚 Library Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={handleSearch}
        className="booklist-search"
      />

      {/* Book Grid */}
      <div className="booklist-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div key={index} className="book-card">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">✍ {book.author}</p>
              <p className="book-meta">
                📖 {book.genre} | 📅 {book.year}
              </p>
              <button>Add to Favorite</button>
            </div>
          ))
        ) : (
          <p className="booklist-empty">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
