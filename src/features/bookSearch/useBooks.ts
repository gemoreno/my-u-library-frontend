// useBooks.ts
import { useState } from "react";
import { fetchBooks, fetchCheckedoutBooks } from "./bookApi";
import type { BookFilters } from "@/components/BookFilterBar";

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year_published?: string;
  stock: number;
  available: number;
  checkout_date?: string;
}

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

  const searchCheckedoutBooks = async (filters: BookFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCheckedoutBooks(filters);
      setBooks(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, searchBooks, searchCheckedoutBooks, updateBookAvailability };
}
