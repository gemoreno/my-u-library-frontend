import { useEffect, useState } from "react"
import { useBooks } from "../bookSearch/useBooks";
import type { BookFilters } from "@/components/BookFilterBar";
import BookFilterBar from "@/components/BookFilterBar";
import BookList from "@/components/BookList";

export default function MyCheckoutsPage() {
  const [filters, setFilters] = useState<BookFilters>({});
  const { books, loading, error, searchCheckedoutBooks } = useBooks();
  const [ hasSearched, setHasSearched ] = useState<boolean>(false);

  useEffect(() => {
    searchCheckedoutBooks(filters)
    setHasSearched(true);
  }, []);

  const handleChange = (filterValues: BookFilters) => {
    setFilters(filterValues);
  };

  const handleSearch = () => {
    searchCheckedoutBooks(filters);
    setHasSearched(true);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold text-blue-800 mb-4">My Checkouts</h1>
      <BookFilterBar className={"mb-4"} filters={filters} onFiltersChange={handleChange} onSearch={handleSearch}/>
      <BookList books={books} loading={loading} hasSearched={hasSearched} isMyCheckoutsPage={true}/>
    </div>
  )
}
