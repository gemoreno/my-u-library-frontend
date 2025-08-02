import api from "@/lib/axios"
import type { CheckoutRecord } from "./useCheckouts";

export async function checkoutBook(bookId: number) {
  const res = await api.post(`/checkouts/checkout_book/${bookId}/`)
  return res.data
}

export async function fetchCheckouts(): Promise<CheckoutRecord[]> {
  const res = await api.get<CheckoutRecord[]>(`/checkouts/}`);
  return res.data;
}

export const returnCheckout = async (id: number): Promise<void> => {
  await api.patch(`/checkouts/${id}/return/`)
}