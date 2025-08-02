import type { BookFilters } from "@/components/BookFilterBar";
import api from "@/lib/axios";
import type { Book } from "./useBooks";

export interface NewBookData {
  title: string;
  author: string;
  genre: string;
  year_published?: string;
  stock: number;
}

export async function fetchBooks(filters: BookFilters): Promise<Book[]> {
  const params = new URLSearchParams();

  if (filters.title) params.append("title", filters.title);
  if (filters.author) params.append("author", filters.author);
  if (filters.genre) params.append("genre", filters.genre);

  const res = await api.get<Book[]>(`/books/?${params.toString()}`);
  return res.data;
}

export async function fetchCheckedoutBooks(filters: BookFilters): Promise<Book[]> {
  const params = new URLSearchParams();

  if (filters.title) params.append("title", filters.title);
  if (filters.author) params.append("author", filters.author);
  if (filters.genre) params.append("genre", filters.genre);

  const res = await api.get<Book[]>(`/books/checked_out/?${params.toString()}`);
  return res.data;
}

export async function addBook(newBook: NewBookData): Promise<Book> {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await api.post("/books/", newBook, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return res.data
  } catch (err: any) {
    const message =
      err?.response?.data?.detail || err.message || "Failed to add book";
    throw new Error(message);
  }
}