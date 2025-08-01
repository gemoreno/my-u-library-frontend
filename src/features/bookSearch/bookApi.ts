import type { BookFilters } from "@/components/BookFilterBar";
import api from "@/lib/axios";
import type { Book } from "./useBooks";

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