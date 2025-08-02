import { useEffect, useState } from "react"
import { useCheckouts } from "./useCheckouts"
import CheckoutRecordTable, { type CheckoutRecordFilters } from "@/components/CheckoutRecordTable";
import { FaSpinner } from "react-icons/fa";

export default function LibrarianDashboard() {
  const [filters, setFilters] = useState<Partial<CheckoutRecordFilters>>({
    returned: false,
  });
  const { checkouts, allCheckouts, loading, fetchCheckouts, filterCheckouts, returnBook } = useCheckouts();

  const [filteredReady, setFilteredReady] = useState(false);

  useEffect(() => {
    if (allCheckouts.length > 0) {
      fetchCheckouts();
      setFilteredReady(true);
    }
  }, [allCheckouts]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    filterCheckouts(newFilters);
    console.log(filters)
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold text-blue-800 mb-4">All Checkouts</h1>
      {loading &&
      <div className="flex justify-center items-center mt-10">
        <FaSpinner className="animate-spin text-green-500 text-5xl" />
      </div>}
      {filteredReady && 
      <CheckoutRecordTable 
        checkouts={checkouts} 
        filters={filters} 
        onFiltersChange={handleFiltersChange} 
        onReturn={returnBook}
      />}
    </div>
  )
}
