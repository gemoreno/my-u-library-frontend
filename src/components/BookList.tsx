import type { Book } from "@/features/bookSearch/useBooks";
import BookCard from "./BookCard";
import { FaSpinner } from "react-icons/fa";

interface BookListProps {
  books: Book[];
  isMyCheckoutsPage?: boolean;
  updateBookAvailability?: (bookId: number) => void;
  hasSearched: boolean;
  loading: boolean;
}

export default function BookList({ 
  books, 
  isMyCheckoutsPage = false, 
  updateBookAvailability,
  hasSearched,
  loading
}: BookListProps) {

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <FaSpinner className="animate-spin text-green-500 text-5xl" />
      </div>
    );
  }

  if (!hasSearched) {
    return <p className="text-gray-500 mt-4">Please do a search.</p>;
  }

  if (books.length === 0 && !loading) {
    return <p className="text-gray-500 mt-4">No books found.</p>;
  }

  return (
    <>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          updateBookAvailability={updateBookAvailability}
          isCheckedOut={isMyCheckoutsPage}
        />
      ))}
    </>
  );
}
