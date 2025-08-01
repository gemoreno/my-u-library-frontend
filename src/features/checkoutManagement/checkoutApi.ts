import api from "@/lib/axios"
import type { CheckoutFilters, CheckoutRecord } from "./types";


export async function checkoutBook(bookId: number) {
  const res = await api.post(`/checkouts/checkout_book/${bookId}/`)
  return res.data
}

export async function fetchCheckouts(filters: CheckoutFilters): Promise<CheckoutRecord[]> {
  const params = new URLSearchParams();

  if (filters.book_title) params.append("book_title", filters.book_title);
  if (filters.user_first_name) params.append("user_first_name", filters.user_first_name);
  if (filters.user_last_name) params.append("user_last_name", filters.user_last_name);
  if (filters.user_email) params.append("user_email", filters.user_email);

  const res = await api.get<CheckoutRecord[]>(`/checkouts/?${params.toString()}`);
  return res.data;
}

export const returnCheckout = async (id: number): Promise<void> => {
  await api.patch(`/checkouts/${id}/return/`)
}