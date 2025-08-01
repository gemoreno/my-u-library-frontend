import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { CheckoutRecord } from "@/features/checkoutManagement/useCheckouts";
import FilterableTableHead from "./FilterableTableHead";

export interface CheckoutRecordFilters {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  book_title: string;
  returned: boolean;
}

interface CheckoutTableProps {
  checkouts: CheckoutRecord[];
  filters: Partial<CheckoutRecordFilters>;
  onFiltersChange: (filters: Partial<CheckoutRecordFilters>) => void;
  onReturn: (checkoutId: number) => void;
}

const filterableColumns = [
  { key: "user_first_name", placeholder: "First Name", inputType: "text" },
  { key: "user_last_name", placeholder: "Last Name", inputType: "text" },
  { key: "user_email", placeholder: "Email", inputType: "text" },
  { key: "book_title", placeholder: "Book Title", inputType: "text" },
  { key: "returned", placeholder: "Returned", inputType: "checkbox" },
] as const;

export default function CheckoutTable({ checkouts, filters, onFiltersChange, onReturn }: CheckoutTableProps) {

  const handleInputChange = (key: keyof CheckoutRecordFilters, value: string | boolean) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {filterableColumns.map(({ key, placeholder, inputType }) => (
            <FilterableTableHead
              key={key}
              inputType={inputType}
              placeholder={placeholder}
              value={filters[key] || ""}
              onChange={(value) => handleInputChange(key, value)}
            />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {checkouts.map((row) => (
          <TableRow key={row.id}>
            {filterableColumns.map((column) => (
              column.key === 'returned'
                ? ( !row.returned
                    ? <TableCell>
                        <Button variant="outline" onClick={() => onReturn(row.id)}>
                            Return
                          </Button>
                      </TableCell>
                    : <TableCell></TableCell>)
                : <TableCell>{row[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
