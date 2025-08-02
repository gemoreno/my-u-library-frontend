import { useState, useEffect } from "react";
import { fetchCheckouts, returnCheckout } from "./checkoutApi";
import type { CheckoutRecordFilters } from "@/components/CheckoutRecordTable";
import type { User } from "../auth/types";
import type { Book } from "../bookSearch/useBooks";


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

export function useCheckouts() {
  const [allCheckouts, setAllCheckouts] = useState<CheckoutRecord[]>([]);
  const [checkouts, setCheckouts] = useState<CheckoutRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCheckouts({});
        setAllCheckouts(data);
        setCheckouts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const filterCheckouts = (filters: Partial<CheckoutRecordFilters>) => {
    const filtered = allCheckouts.filter((record) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (filterValue === undefined || filterValue === null) return true;

        const recordValue = record[key as keyof CheckoutRecordFilters];
        // Handle boolean filter (like 'returned')
        if (typeof filterValue === "boolean") {
          console.log(record)
          console.log(`recordValue=${recordValue}; filterValue=${filterValue}; r===f=${recordValue === !!filterValue}`)
          return recordValue === !!filterValue;
        }

        // Handle string filters (case-insensitive)
        if (typeof filterValue === "string") {
          return (
            typeof recordValue === "string" &&
            recordValue.toLowerCase().includes(filterValue.toLowerCase())
          );
        }

          return true;
        });
    });
    setCheckouts(filtered);
  };

  const returnBook = async (id: number) => {
    await returnCheckout(id);
    setAllCheckouts((prev) => prev.filter((c) => c.id !== id));
    setCheckouts((prev) => prev.filter((c) => c.id !== id));
  };

  return { checkouts, allCheckouts, loading, error, filterCheckouts, returnBook };
}
