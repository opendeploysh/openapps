"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { SortSelect } from "./SortSelect";
import { FilterBadges, FilterOption } from "./FilterBadges";
import { SlidersHorizontal } from "lucide-react";

export interface ProjectFiltersProps {
  onSearch?: (query: string) => void;
  onSort?: (sortValue: string) => void;
  onFilterChange?: (filterType: string, values: string[]) => void;
  sortValue?: string;
  searchPlaceholder?: string;
  categoryFilters?: FilterOption[];
  difficultyFilters?: FilterOption[];
  popularAlternatives?: string[];
  activeCategoryFilters?: string[];
  activeDifficultyFilters?: string[];
  showCategoryFilters?: boolean;
  showDifficultyFilters?: boolean;
  showPopularAlternatives?: boolean;
  className?: string;
}

export const ProjectFilters = ({
  onSearch,
  onSort,
  onFilterChange,
  sortValue = "relevance",
  searchPlaceholder = "Search projects...",
  categoryFilters = [],
  difficultyFilters = [],
  popularAlternatives = [],
  activeCategoryFilters = [],
  activeDifficultyFilters = [],
  showCategoryFilters = true,
  showDifficultyFilters = true,
  showPopularAlternatives = true,
  className = "",
}: ProjectFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryFilterToggle = (category: string) => {
    const updatedFilters = activeCategoryFilters.includes(category)
      ? activeCategoryFilters.filter((f) => f !== category)
      : [...activeCategoryFilters, category];
    onFilterChange?.("category", updatedFilters);
  };

  const handleDifficultyFilterToggle = (difficulty: string) => {
    const updatedFilters = activeDifficultyFilters.includes(difficulty)
      ? activeDifficultyFilters.filter((f) => f !== difficulty)
      : [...activeDifficultyFilters, difficulty];
    onFilterChange?.("difficulty", updatedFilters);
  };

  const handleClearAllFilters = () => {
    onFilterChange?.("category", []);
    onFilterChange?.("difficulty", []);
    setShowFilters(false);
  };

  const hasActiveFilters =
    activeCategoryFilters.length > 0 || activeDifficultyFilters.length > 0;

  return (
    <section className={`mb-4 ${className}`}>
      <div>
        {/* Main filter bar */}
        <div className="flex gap-2 mb-3 items-center">
          <div className="flex-1">
            <SearchBar
              onSearch={onSearch || (() => {})}
              placeholder={searchPlaceholder}
            />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {onSort && <SortSelect value={sortValue} onValueChange={onSort} />}
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {hasActiveFilters && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </Button>
          </div>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-md mb-3 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={handleClearAllFilters}
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Category filters */}
            {showCategoryFilters && categoryFilters.length > 0 && (
              <FilterBadges
                title="Categories"
                filters={categoryFilters}
                activeFilters={activeCategoryFilters}
                onFilterToggle={handleCategoryFilterToggle}
                onClearAll={() => onFilterChange?.("category", [])}
              />
            )}

            {/* Difficulty filters */}
            {showDifficultyFilters && difficultyFilters.length > 0 && (
              <FilterBadges
                title="Difficulty"
                filters={difficultyFilters}
                activeFilters={activeDifficultyFilters}
                onFilterToggle={handleDifficultyFilterToggle}
                onClearAll={() => onFilterChange?.("difficulty", [])}
                variant="outline"
              />
            )}

            {/* Popular alternatives */}
            {showPopularAlternatives && popularAlternatives.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex-shrink-0">
                  Popular alternatives to:
                </span>
                {popularAlternatives.map((alternative) => (
                  <Button
                    key={alternative}
                    variant="outline"
                    size="sm"
                    className="h-6 text-xs px-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => onSearch?.(alternative)}
                  >
                    {alternative}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
