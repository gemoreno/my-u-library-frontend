// useBooks.ts
import { useState } from "react";
import { fetchBooks } from "./bookApi";
import type { BookFilters, Book } from "./types";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchBooks = async (filters: BookFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks(filters);
      setBooks(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookAvailability = (bookId: number) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === bookId
          ? { ...book, available: book.available - 1}
          : book
      )
    )
  }

  return { books, loading, error, searchBooks, updateBookAvailability };
}
