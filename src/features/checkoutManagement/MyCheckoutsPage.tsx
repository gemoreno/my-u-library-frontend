import { useState } from "react"
import { useBooks } from "../bookSearch/useBooks";
import type { BookFilters } from "@/components/BookFilterBar";
import BookFilterBar from "@/components/BookFilterBar";
import BookList from "@/components/BookList";

export default function MyCheckoutsPage() {
  const [filters, setFilters] = useState<BookFilters>({});
  const { books, loading, error, searchCheckedoutBooks } = useBooks();

  const handleChange = (filterValues: BookFilters) => {
    setFilters(filterValues);
  };

  const handleSearch = () => {
    searchCheckedoutBooks(filters);
  };

  return (
    <div>
      <BookFilterBar className={"mb-4"} filters={filters} onFiltersChange={handleChange} onSearch={handleSearch}/>
      <BookList books={books} isMyCheckoutsPage={true}/>
    </div>
  )
}
