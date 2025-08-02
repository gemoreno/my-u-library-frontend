import { useState } from "react";
import BookList from "@/components/BookList";
import { useBooks } from "./useBooks";
import type { BookFilters } from "@/components/BookFilterBar";
import BookFilterBar from "@/components/BookFilterBar";
import AddBookDialog from "@/components/AddBookDialog";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import type { NewBookData } from "./bookApi";

export default function BookSearch() {
  const [filters, setFilters] = useState<BookFilters>({});
  const { books, loading, searchBooks, updateBookAvailability, createBook } = useBooks();
  const [ hasSearched, setHasSearched ] = useState<boolean>(false);

  const userRole = useSelector(selectCurrentUser)?.role

  const handleChange = (filterValues: BookFilters) => {
    setFilters(filterValues);
  };

  const handleSearch = () => {
    searchBooks(filters);
    setHasSearched(true);
  };

  const handleAddBook = async (newBook: NewBookData) => {
    try {
      await createBook(newBook);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold text-blue-800 mb-4">Book Search</h1>
      <div className="flex justify-between">
        <BookFilterBar className={"mb-4"} filters={filters} onFiltersChange={handleChange} onSearch={handleSearch}/>
        {(userRole==='librarian') && 
          <AddBookDialog onAddBook={handleAddBook} loading={loading} />}
      </div>
      <BookList 
        books={books} 
        isMyCheckoutsPage={false} 
        hasSearched={hasSearched} 
        updateBookAvailability={updateBookAvailability}
        loading={loading}/>
    </div>
  );
}
