import type { BookFilters, Book } from "./types";
import api from "@/lib/axios";

export async function fetchBooks(filters: BookFilters): Promise<Book[]> {
  const params = new URLSearchParams();

  if (filters.title) params.append("title", filters.title);
  if (filters.author) params.append("author", filters.author);
  if (filters.genre) params.append("genre", filters.genre);

  const res = await api.get<Book[]>(`/books/?${params.toString()}`);
  return res.data;
}