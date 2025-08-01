import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

// NOTE: Keep this in sync with filterFields const
export interface BookFilters {
  title?: string;
  author?: string;
  genre?: string;
}

interface FilterField {
  name: keyof BookFilters;
  placeholder: string;
  type?: string;
}

// NOTE: Keep this in sync with BookFilterValues interface
const filterFields: FilterField[] = [
  { name: "title", placeholder: "Title" },
  { name: "author", placeholder: "Author" },
  { name: "genre", placeholder: "Genre" },
];

interface BookFiltersProps {
  filters: BookFilters;
  onFiltersChange: (filterValues: BookFilters) => void;
  showSearchButton?: boolean;
  onSearch?: () => void;
  className?: string;
}

export default function BookFilterBar({
  filters,
  onFiltersChange,
  showSearchButton = true,
  onSearch,
  className=""
}: BookFiltersProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`flex gap-2 w-fit ${className}`}>
      {filterFields.map(({ name, placeholder, type }) => (
        <Input
          key={name}
          name={name}
          placeholder={placeholder}
          type={type || "text"}
          value={filters[name] || ""}
          onChange={handleChange}
        />
      ))}
      {showSearchButton && (
        <Button
          onClick={onSearch}
          className="btn btn-outline"
          type="button"
        >
          Search
        </Button>
      )}
    </div>
  );
}
