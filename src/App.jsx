
import { useState, useRef, useEffect } from "react";
import { books } from "./data/books";
import Jar from "./components/Jar";
import "./App.css";

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const timerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (!selectedBook) return;

    closeButtonRef.current?.focus();

    function handleEscape(event) {
      if (event.key === "Escape") {
        setSelectedBook(null);
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedBook]);

  function drawBook() {
    if (isShaking || books.length === 0) return;

    setSelectedBook(null);
    setIsShaking(true);

    timerRef.current = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * books.length);
      setSelectedBook(books[randomIndex]);
      setIsShaking(false);
    }, 1700);
  }

  function closeResult() {
    setSelectedBook(null);
  }

  return (
    <main className="app">
      <div className="stars" aria-hidden="true" />

      <header className="app-header">
        <span className="eyebrow">✦ A LITTLE READING MAGIC ✦</span>
        <h1>The Enchanted TBR Jar</h1>
        <p>
          So many stories, so little time.
          <br />
          Let a little magic choose your next adventure.
        </p>
      </header>

      <section className="jar-section">
        <Jar bookCount={books.length} isShaking={isShaking} />

        <div className="book-counter">
          ✧ {books.length} stories waiting to be discovered ✧
        </div>

        <button
          className="draw-button"
          onClick={drawBook}
          disabled={isShaking || books.length === 0}
        >
          {isShaking ? "✧ The magic is working..." : "✦ Draw a Book ✦"}
        </button>
      </section>

      <section className="collection-section">
        <button
          className="collection-toggle"
          onClick={() => setShowBooks(!showBooks)}
          aria-expanded={showBooks}
        >
          {showBooks ? "✧ Hide My TBR Collection" : "✧ View My TBR Collection"}
        </button>

        {showBooks && (
          <div className="book-collection">
            {books.map((book) => (
              <div className="collection-book" key={book.id}>
                <span className="collection-icon">✦</span>
                <div>
                  <strong>{book.title}</strong>
                  <span>{book.author}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="app-footer">
        ✦ Every book holds a little magic ✦
      </footer>

      {selectedBook && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeResult();
            }
          }}
        >
          <div
            className="result-card result-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="selected-book-title"
          >
            <button
              ref={closeButtonRef}
              className="modal-close"
              onClick={closeResult}
              aria-label="Close result"
            >
              ×
            </button>

            <span className="result-sparkle">✦ ✧ ✦</span>
            <p className="result-label">The stars have chosen...</p>

            <h2 id="selected-book-title">
              {selectedBook.title}
            </h2>

            <p className="result-author">
              by {selectedBook.author}
            </p>

            <span className="result-footer">
              Your next adventure awaits ♡
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
