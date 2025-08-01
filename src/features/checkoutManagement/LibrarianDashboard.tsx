import { useState } from "react"
import type { CheckoutFilters } from "./types"
import { Button } from "@/components/ui/button"
import { useCheckouts } from "./useCheckouts"
import { Input } from "@/components/ui/input"

export default function LibrarianDashboard() {
  const [filters, setFilters] = useState<CheckoutFilters>({});
  const { checkouts, loading, error, searchCheckouts, returnBook } = useCheckouts()

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    searchCheckouts(filters);
  };

  return (
    <div className="px-6">
      <div className="flex gap-2">
        <Input placeholder="First Name" onChange={handleChange} />
        <Input placeholder="Last Name" onChange={handleChange} />
        <Input placeholder="Email" onChange={handleChange} />
        <Input placeholder="Book Title" onChange={handleChange} />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div>
        <ul>
          {checkouts.map(c => (
            <li key={c.id}>
              {c.user_first_name} - {c.user_last_name} - {c.book_title}
              {!c.returned && <Button variant={'outline'} onClick={() => returnBook(c.id)}>Return</Button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
