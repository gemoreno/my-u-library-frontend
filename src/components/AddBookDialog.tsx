import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {type NewBookData } from "@/features/bookSearch/bookApi";

interface AddBookDialogProps {
  onAddBook: (newBook: NewBookData) => void;
  loading: boolean;
}

export default function AddBookDialog({ onAddBook, loading }: AddBookDialogProps) {

  const initNewBook: NewBookData = {
    title: "",
    author: "",
    genre: "",
    year_published: "",
    stock: 0,
  }

  const [ newBook, setNewBook] = useState<NewBookData>(initNewBook);

  const handleChange = (value: string | number, label: keyof NewBookData) => {
    setNewBook((prev) => ({
        ...prev,
        [label]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600">Add Book</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Title" value={newBook.title} onChange={(e) => handleChange(e.target.value, 'title')} />
          <Input placeholder="author" value={newBook.author} onChange={(e) => handleChange(e.target.value, 'author')} />
          <Input placeholder="genre" value={newBook.genre} onChange={(e) => handleChange(e.target.value, 'genre')} />
          <Input placeholder="year_published" value={newBook.year_published} onChange={(e) => handleChange(e.target.value, 'year_published')} />
          <Input placeholder="stock" value={newBook.stock} onChange={(e) => handleChange(e.target.value, 'stock')} />
          <Button onClick={() => onAddBook(newBook)} disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
