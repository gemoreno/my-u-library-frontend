import { Input } from "@/components/ui/input";
import { TableHead } from "@/components/ui/table";
import type { InputHTMLAttributes } from "react";


interface FilterableTableHeadProps {
  placeholder: string;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  inputType?: string;
  className?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type" | "placeholder">;
}

export default function FilterableTableHead({
  placeholder,
  value,
  onChange,
  inputType = "text",
  className: className,
  inputProps,
}: FilterableTableHeadProps) {
  return (
  <TableHead>
    {inputType === "checkbox" ? (
      <label className="inline-flex items-center cursor-pointer">
        <Input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          {...inputProps}
        />
        <span className="ml-2">{placeholder}</span>
      </label>
    ) : (
      <Input
        type={inputType}
        value={value as string}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={className ?? "h-8"}
        {...inputProps}
      />
    )}
  </TableHead>
);
}
