import type { Book } from "@/features/bookSearch/types";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[];
  updateBookAvailability: (bookId:number) => void;
}

export default function BookList({ books, updateBookAvailability }: BookListProps) {
  if (books.length === 0) {
    return <p className="text-gray-500 mt-4">No books found.</p>;
  }

  return (
    <>
      {books.map((book) => (
          <BookCard book={book} updateBookAvailability={updateBookAvailability}/>
      ))}
    </>
  );
}
