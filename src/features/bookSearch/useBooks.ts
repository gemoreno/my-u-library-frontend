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

  return { books, loading, error, searchBooks };
}
