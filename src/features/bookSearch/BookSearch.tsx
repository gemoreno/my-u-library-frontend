import { useState } from "react";
import type { BookFilters } from "./types";
import BookList from "@/components/BookList";
import { useBooks } from "./useBooks";
import LoginDialog from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function BookSearch() {
  const [filters, setFilters] = useState<BookFilters>({});
  const { books, loading, error, searchBooks, updateBookAvailability } = useBooks();
  
  const navigate = useNavigate()
  const userRole = useSelector(selectCurrentUser)?.role

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
    <div className="px-6">
      <div className="flex justify-between py-2">
        <div className="flex gap-2">
          <Input name="title" placeholder="Title" onChange={handleChange} />
          <Input name="author" placeholder="Author" onChange={handleChange} />
          <Input name="genre" placeholder="Genre" onChange={handleChange} />
          <Button variant={'outline'} onClick={handleSearch}>Search</Button>
        </div>
        <div>
          {userRole === "librarian" && (
            <Button variant={'outline'} onClick={() => navigate("/librarian")}>Librarian Dashboard</Button>
          )}

          <LoginDialog />
        </div>
        
      </div>
      <BookList books={books} updateBookAvailability={updateBookAvailability}/>
    </div>
  );
}
