import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FilterX } from "lucide-react"

export interface FilterOption {
  value: string
  label: string
  icon?: React.ReactNode
  count?: number
}

interface FilterBadgesProps {
  title: string
  filters: FilterOption[]
  activeFilters: string[]
  onFilterToggle: (filterValue: string) => void
  onClearAll?: () => void
  variant?: "default" | "outline" | "secondary"
  className?: string
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
  const hasActiveFilters = activeFilters.length > 0

  return (
    <div className={`flex flex-wrap items-start gap-2 min-w-0 ${className}`}>
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex-shrink-0 min-w-fit">
        {title}:
      </span>

      <div className="flex flex-wrap gap-2 flex-1 min-w-0">
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.value)
          const hoverClass = isActive
            ? "hover:bg-neutral-700 dark:hover:bg-neutral-600"
            : "hover:bg-neutral-100 dark:hover:bg-neutral-800"

          return (
            <Badge
              key={filter.value}
              variant={isActive ? "default" : variant}
              className={`px-2 py-0.5 text-sm cursor-pointer inline-flex items-center gap-1 ${hoverClass} transition-colors flex-shrink-0`}
              onClick={() => onFilterToggle(filter.value)}
            >
              {filter.icon && <span className="w-3 h-3 flex-shrink-0">{filter.icon}</span>}
              <span className="truncate">{filter.label}</span>
              {filter.count && <span className="text-xs opacity-75 flex-shrink-0">({filter.count})</span>}
              {isActive && <FilterX className="w-3 h-3 ml-1 flex-shrink-0" />}
            </Badge>
          )
        })}

        {hasActiveFilters && onClearAll && (
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2 flex-shrink-0" onClick={onClearAll}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  )
}
