import type { Book } from "@/features/bookSearch/types";

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return <p className="text-gray-500 mt-4">No books found.</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {books.map((book) => (
        <li key={book.id} className="p-3 border rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-600">
            by {book.author} &middot; {book.genre}
          </p>
          {book.year_published && (
            <p className="text-xs text-gray-400">Published: {book.year_published}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
