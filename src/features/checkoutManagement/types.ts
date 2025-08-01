import type { User } from "../auth/types";
import type { Book } from "../bookSearch/types";

export interface CheckoutRecord {
  id: number;
  user: User;
  book: Book;
  checked_out_at: string;
  returned: boolean;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  book_title: string;
}

export interface CheckoutFilters {
  book_title?: string;
  user_first_name?: string;
  user_last_name?: string;
  user_email?: string;
}