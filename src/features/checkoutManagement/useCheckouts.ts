// useCheckouts.ts
import { useState } from "react";
import { fetchCheckouts, returnCheckout } from "./checkoutApi";
import type { CheckoutFilters, CheckoutRecord } from "./types";

export function useCheckouts() {
  const [checkouts, setCheckouts] = useState<CheckoutRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchCheckouts = async (filters: CheckoutFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCheckouts(filters);
      setCheckouts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (id: number) => {
    await returnCheckout(id)
    setCheckouts(prev => prev.filter(c => c.id !== id))
  }
  return { checkouts, loading, error, searchCheckouts, returnBook };
}
