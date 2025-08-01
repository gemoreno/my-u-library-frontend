import { useState } from "react"
import { useCheckouts } from "./useCheckouts"
import CheckoutRecordTable, { type CheckoutRecordFilters } from "@/components/CheckoutRecordTable";

export default function LibrarianDashboard() {
  const { checkouts, loading, error, filterCheckouts, returnBook } = useCheckouts();
  const [filters, setFilters] = useState<Partial<CheckoutRecordFilters>>({});

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    filterCheckouts(newFilters);
    console.log(filters)
  };

  return (
    <div>
      <CheckoutRecordTable checkouts={checkouts} filters={filters} onFiltersChange={handleFiltersChange} onReturn={returnBook}/>
    </div>
  )
}
