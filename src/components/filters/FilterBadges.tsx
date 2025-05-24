import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface FilterBadgesProps {
  title: string;
  filters: FilterOption[];
  activeFilters: string[];
  onFilterToggle: (filterValue: string) => void;
  onClearAll?: () => void;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export const FilterBadges = ({
  title,
  filters,
  activeFilters,
  onFilterToggle,
  onClearAll,
  variant = "secondary",
  className = "",
}: FilterBadgesProps) => {
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex-shrink-0">
        {title}:
      </span>

      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.value);
        const hoverClass = isActive
          ? "hover:bg-neutral-700 dark:hover:bg-neutral-600"
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800";

        return (
          <Badge
            key={filter.value}
            variant={isActive ? "default" : variant}
            className={`px-2 py-0.5 text-sm cursor-pointer flex items-center gap-1 ${hoverClass} transition-colors`}
            onClick={() => onFilterToggle(filter.value)}
          >
            {filter.icon && <div className="w-3 h-3">{filter.icon}</div>}
            {filter.label}
            {filter.count && (
              <span className="text-xs opacity-75">({filter.count})</span>
            )}
            {isActive && <FilterX className="w-3 h-3 ml-1" />}
          </Badge>
        );
      })}

      {hasActiveFilters && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs px-2"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  );
};
