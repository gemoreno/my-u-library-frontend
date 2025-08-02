import { useState } from "react";
import BookList from "@/components/BookList";
import { useBooks } from "./useBooks";
import type { BookFilters } from "@/components/BookFilterBar";
import BookFilterBar from "@/components/BookFilterBar";

export default function BookSearch() {
  const [filters, setFilters] = useState<BookFilters>({});
  const { books, loading, error, searchBooks, updateBookAvailability } = useBooks();

  const handleChange = (filterValues: BookFilters) => {
    setFilters(filterValues);
  };

  const handleSearch = () => {
    searchBooks(filters);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold text-blue-800 mb-4">Book Search</h1>
      <BookFilterBar className={"mb-4"} filters={filters} onFiltersChange={handleChange} onSearch={handleSearch}/>
      <BookList books={books} isMyCheckoutsPage={false} updateBookAvailability={updateBookAvailability}/>
    </div>
  );
}
