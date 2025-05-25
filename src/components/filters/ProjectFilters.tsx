"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
  pricingFilters?: FilterOption[];
  hostingFilters?: FilterOption[];
  popularAlternatives?: string[];
  activeCategoryFilters?: string[];
  activeDifficultyFilters?: string[];
  activePricingFilters?: string[];
  activeHostingFilters?: string[];
  showCategoryFilters?: boolean;
  showDifficultyFilters?: boolean;
  showPricingFilters?: boolean;
  showHostingFilters?: boolean;
  showPopularAlternatives?: boolean;
  className?: string;
  // URL sync props
  enableUrlSync?: boolean;
  defaultSort?: string;
  initialSearchQuery?: string;
}

export const ProjectFilters = ({
  onSearch,
  onSort,
  onFilterChange,
  sortValue = "relevance",
  searchPlaceholder = "Search projects...",
  categoryFilters = [],
  difficultyFilters = [],
  pricingFilters = [],
  hostingFilters = [],
  popularAlternatives = [],
  activeCategoryFilters = [],
  activeDifficultyFilters = [],
  activePricingFilters = [],
  activeHostingFilters = [],
  showCategoryFilters = true,
  showDifficultyFilters = true,
  showPricingFilters = true,
  showHostingFilters = true,
  showPopularAlternatives = true,
  className = "",
  enableUrlSync = false,
  defaultSort = "relevance",
  initialSearchQuery = "",
}: ProjectFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Helper function to update URL with current filter state
  const updateURL = useCallback(
    (
      tags: string[],
      difficulties: string[],
      pricing: string[],
      hosting: string[],
      sort: string,
      query?: string
    ) => {
      if (!enableUrlSync) return;

      const params = new URLSearchParams();

      if (tags.length > 0) params.set("tags", tags.join(","));
      if (difficulties.length > 0)
        params.set("difficulties", difficulties.join(","));
      if (pricing.length > 0) params.set("pricing", pricing.join(","));
      if (hosting.length > 0) params.set("hosting", hosting.join(","));
      if (sort !== defaultSort) params.set("sort", sort);
      if (query && query.trim()) params.set("q", query.trim());

      const url = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(url, { scroll: false });
    },
    [enableUrlSync, defaultSort, pathname, router]
  );

  // Helper function to read initial values from URL
  const getInitialFilters = useCallback(() => {
    if (!enableUrlSync) {
      return {
        tags: activeCategoryFilters || [],
        difficulties: activeDifficultyFilters || [],
        pricing: activePricingFilters || [],
        hosting: activeHostingFilters || [],
        sort: sortValue || defaultSort,
        query: initialSearchQuery,
      };
    }

    const tags =
      searchParams.get("tags")?.split(",").filter(Boolean) ||
      activeCategoryFilters ||
      [];
    const difficulties =
      searchParams.get("difficulties")?.split(",").filter(Boolean) ||
      activeDifficultyFilters ||
      [];
    const pricing =
      searchParams.get("pricing")?.split(",").filter(Boolean) ||
      activePricingFilters ||
      [];
    const hosting =
      searchParams.get("hosting")?.split(",").filter(Boolean) ||
      activeHostingFilters ||
      [];
    const sort = searchParams.get("sort") || sortValue || defaultSort;
    const query = searchParams.get("q") || initialSearchQuery;

    return { tags, difficulties, pricing, hosting, sort, query };
  }, [
    enableUrlSync,
    searchParams,
    activeCategoryFilters,
    activeDifficultyFilters,
    activePricingFilters,
    activeHostingFilters,
    sortValue,
    defaultSort,
    initialSearchQuery,
  ]);

  // Internal state for URL-synced filters
  const [internalCategoryFilters, setInternalCategoryFilters] = useState<
    string[]
  >([]);
  const [internalDifficultyFilters, setInternalDifficultyFilters] = useState<
    string[]
  >([]);
  const [internalPricingFilters, setInternalPricingFilters] = useState<
    string[]
  >([]);
  const [internalHostingFilters, setInternalHostingFilters] = useState<
    string[]
  >([]);
  const [internalSortValue, setInternalSortValue] =
    useState<string>(defaultSort);
  const [internalSearchQuery, setInternalSearchQuery] = useState<string>("");

  // Initialize from URL on mount
  useEffect(() => {
    if (enableUrlSync) {
      const { tags, difficulties, pricing, hosting, sort, query } =
        getInitialFilters();

      setInternalCategoryFilters(tags);
      setInternalDifficultyFilters(difficulties);
      setInternalPricingFilters(pricing);
      setInternalHostingFilters(hosting);
      setInternalSortValue(sort);
      setInternalSearchQuery(query);

      // Notify parent components of initial state
      onFilterChange?.("category", tags);
      onFilterChange?.("difficulty", difficulties);
      onFilterChange?.("pricing", pricing);
      onFilterChange?.("hosting", hosting);
      onSort?.(sort);
      if (query) {
        onSearch?.(query);
      }
    }
  }, [enableUrlSync, getInitialFilters, onFilterChange, onSort, onSearch]);

  // Use internal state when URL sync is enabled, otherwise use props
  const currentCategoryFilters = enableUrlSync
    ? internalCategoryFilters
    : activeCategoryFilters || [];
  const currentDifficultyFilters = enableUrlSync
    ? internalDifficultyFilters
    : activeDifficultyFilters || [];
  const currentPricingFilters = enableUrlSync
    ? internalPricingFilters
    : activePricingFilters || [];
  const currentHostingFilters = enableUrlSync
    ? internalHostingFilters
    : activeHostingFilters || [];
  const currentSortValue = enableUrlSync
    ? internalSortValue
    : sortValue || defaultSort;

  const handleCategoryFilterToggle = (category: string) => {
    const updatedFilters = currentCategoryFilters.includes(category)
      ? currentCategoryFilters.filter((f) => f !== category)
      : [...currentCategoryFilters, category];

    if (enableUrlSync) {
      setInternalCategoryFilters(updatedFilters);
    }
    onFilterChange?.("category", updatedFilters);
    updateURL(
      updatedFilters,
      currentDifficultyFilters,
      currentPricingFilters,
      currentHostingFilters,
      currentSortValue
    );
  };

  const handleDifficultyFilterToggle = (difficulty: string) => {
    const updatedFilters = currentDifficultyFilters.includes(difficulty)
      ? currentDifficultyFilters.filter((f) => f !== difficulty)
      : [...currentDifficultyFilters, difficulty];

    if (enableUrlSync) {
      setInternalDifficultyFilters(updatedFilters);
    }
    onFilterChange?.("difficulty", updatedFilters);
    updateURL(
      currentCategoryFilters,
      updatedFilters,
      currentPricingFilters,
      currentHostingFilters,
      currentSortValue
    );
  };

  const handlePricingFilterToggle = (pricing: string) => {
    const updatedFilters = currentPricingFilters.includes(pricing)
      ? currentPricingFilters.filter((f) => f !== pricing)
      : [...currentPricingFilters, pricing];

    if (enableUrlSync) {
      setInternalPricingFilters(updatedFilters);
    }
    onFilterChange?.("pricing", updatedFilters);
    updateURL(
      currentCategoryFilters,
      currentDifficultyFilters,
      updatedFilters,
      currentHostingFilters,
      currentSortValue
    );
  };

  const handleHostingFilterToggle = (hosting: string) => {
    const updatedFilters = currentHostingFilters.includes(hosting)
      ? currentHostingFilters.filter((f) => f !== hosting)
      : [...currentHostingFilters, hosting];

    if (enableUrlSync) {
      setInternalHostingFilters(updatedFilters);
    }
    onFilterChange?.("hosting", updatedFilters);
    updateURL(
      currentCategoryFilters,
      currentDifficultyFilters,
      currentPricingFilters,
      updatedFilters,
      currentSortValue
    );
  };

  const handleClearAllFilters = () => {
    if (enableUrlSync) {
      setInternalCategoryFilters([]);
      setInternalDifficultyFilters([]);
      setInternalPricingFilters([]);
      setInternalHostingFilters([]);
    }
    onFilterChange?.("category", []);
    onFilterChange?.("difficulty", []);
    onFilterChange?.("pricing", []);
    onFilterChange?.("hosting", []);
    setShowFilters(false);
    updateURL([], [], [], [], currentSortValue);
  };

  const hasActiveFilters =
    currentCategoryFilters.length > 0 ||
    currentDifficultyFilters.length > 0 ||
    currentPricingFilters.length > 0 ||
    currentHostingFilters.length > 0;

  // Enhanced handlers that sync with URL
  const handleSearchWithUrlSync = (query: string) => {
    onSearch?.(query);
    if (enableUrlSync) {
      setInternalSearchQuery(query);
      updateURL(
        currentCategoryFilters,
        currentDifficultyFilters,
        currentPricingFilters,
        currentHostingFilters,
        currentSortValue,
        query
      );
    }
  };

  const handleSortWithUrlSync = (sortValue: string) => {
    onSort?.(sortValue);
    if (enableUrlSync) {
      setInternalSortValue(sortValue);
      updateURL(
        currentCategoryFilters,
        currentDifficultyFilters,
        currentPricingFilters,
        currentHostingFilters,
        sortValue,
        internalSearchQuery
      );
    }
  };

  return (
    <section className={`mb-4 ${className}`}>
      <div>
        {/* Main filter bar */}
        <div className="flex gap-2 mb-3 items-center">
          <div className="flex-1">
            <SearchBar
              onSearch={handleSearchWithUrlSync}
              placeholder={searchPlaceholder}
            />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {onSort && (
              <SortSelect
                value={currentSortValue}
                onValueChange={handleSortWithUrlSync}
              />
            )}
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
                activeFilters={currentCategoryFilters}
                onFilterToggle={handleCategoryFilterToggle}
                onClearAll={() => onFilterChange?.("category", [])}
              />
            )}

            {/* Difficulty filters */}
            {showDifficultyFilters && difficultyFilters.length > 0 && (
              <FilterBadges
                title="Difficulty"
                filters={difficultyFilters}
                activeFilters={currentDifficultyFilters}
                onFilterToggle={handleDifficultyFilterToggle}
                onClearAll={() => onFilterChange?.("difficulty", [])}
                variant="outline"
              />
            )}

            {/* Pricing filters */}
            {showPricingFilters && pricingFilters.length > 0 && (
              <FilterBadges
                title="Pricing"
                filters={pricingFilters}
                activeFilters={currentPricingFilters}
                onFilterToggle={handlePricingFilterToggle}
                onClearAll={() => onFilterChange?.("pricing", [])}
                variant="outline"
              />
            )}

            {/* Hosting filters */}
            {showHostingFilters && hostingFilters.length > 0 && (
              <FilterBadges
                title="Hosting"
                filters={hostingFilters}
                activeFilters={currentHostingFilters}
                onFilterToggle={handleHostingFilterToggle}
                onClearAll={() => onFilterChange?.("hosting", [])}
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
                    onClick={() => {
                      handleSearchWithUrlSync(alternative);
                    }}
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
