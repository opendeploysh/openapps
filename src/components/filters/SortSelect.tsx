import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {ArrowUpDown} from "lucide-react";

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options?: SortOption[];
  className?: string;
}

const defaultSortOptions: SortOption[] = [
  {value: "relevance", label: "Most Relevant"},
  {value: "popularity", label: "Most Popular"},
  {value: "stars", label: "Most Stars"},
  {value: "name", label: "Name (A-Z)"},
  {value: "difficulty-asc", label: "Easiest First"},
  {value: "difficulty-desc", label: "Advanced First"},
];

export const SortSelect = ({
  value,
  onValueChange,
  options = defaultSortOptions,
  className = "w-[170px]",
}: SortSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`${className} !h-10 bg-white`}>
        <div className="flex items-center gap-1">
          <ArrowUpDown className="h-3.5 w-3.5 text-neutral-500" />
          <SelectValue placeholder="Sort by" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
