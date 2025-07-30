import { useState } from "react";
import type { BookFilters } from "./types";
import BookList from "@/components/BookList";
import { useBooks } from "./useBooks";

export default function BookSearch() {
  const [filters, setFilters] = useState<BookFilters>({});
  const { books, loading, error, searchBooks } = useBooks();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    searchBooks(filters);
  };

  return (
    <div>
      <div className="flex gap-2">
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="author" placeholder="Author" onChange={handleChange} />
        <input name="genre" placeholder="Genre" onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <BookList books={books} />
    </div>
  );
}
