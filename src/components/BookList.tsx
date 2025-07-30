import type { Book } from "@/features/bookSearch/types";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return <p className="text-gray-500 mt-4">No books found.</p>;
  }

  return (
    <>
      {books.map((book) => (
          <BookCard book={book}/>
      ))}
    </>
  );
}
