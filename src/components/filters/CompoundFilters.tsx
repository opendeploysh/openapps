"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { matchSorter } from "match-sorter"
import { ProjectMeta } from "@/lib/projects"
import { SearchBar } from "@/components/SearchBar"
import { SortSelect } from "./SortSelect"
import { FilterBadges, FilterOption } from "./FilterBadges"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

// Types
interface FilterContextValue {
  // Search
  searchQuery: string
  searchResults: ProjectMeta[] | null
  handleSearch: (query: string) => void

  // Sort
  sortOrder: string
  handleSort: (sortValue: string) => void

  // Filters
  activeCategoryFilters: string[]
  activeDifficultyFilters: string[]
  activePricingFilters: string[]
  activeHostingFilters: string[]

  // Filter handlers
  handleCategoryFilterToggle: (category: string) => void
  handleDifficultyFilterToggle: (difficulty: string) => void
  handlePricingFilterToggle: (pricing: string) => void
  handleHostingFilterToggle: (hosting: string) => void
  handleFilterChange: (filterType: string, values: string[]) => void

  // UI State
  showFilters: boolean
  setShowFilters: (show: boolean) => void

  // Utils
  clearAllFilters: () => void
  hasActiveFilters: boolean
}

interface FilterProviderProps {
  children: ReactNode
  projects: ProjectMeta[]
  onFiltersChange?: (filters: {
    search: string
    sort: string
    categories: string[]
    difficulties: string[]
    pricing: string[]
    hosting: string[]
  }) => void
  initialFilters?: {
    categories?: string[]
    difficulties?: string[]
    pricing?: string[]
    hosting?: string[]
  }
  defaultSort?: string
}

// Create context
const FilterContext = createContext<FilterContextValue | undefined>(undefined)

// Hook to use filter context
export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}

// Main provider component
export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  projects,
  onFiltersChange,
  initialFilters = {},
  defaultSort = "relevance",
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ProjectMeta[] | null>(null)
  const [sortOrder, setSortOrder] = useState(defaultSort)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states with initial values
  const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>(initialFilters.categories || [])
  const [activeDifficultyFilters, setActiveDifficultyFilters] = useState<string[]>(initialFilters.difficulties || [])
  const [activePricingFilters, setActivePricingFilters] = useState<string[]>(initialFilters.pricing || [])
  const [activeHostingFilters, setActiveHostingFilters] = useState<string[]>(initialFilters.hosting || [])

  const hasActiveFilters =
    activeCategoryFilters.length > 0 ||
    activeDifficultyFilters.length > 0 ||
    activePricingFilters.length > 0 ||
    activeHostingFilters.length > 0

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange?.({
      search: searchQuery,
      sort: sortOrder,
      categories: activeCategoryFilters,
      difficulties: activeDifficultyFilters,
      pricing: activePricingFilters,
      hosting: activeHostingFilters,
    })
  }, [
    searchQuery,
    sortOrder,
    activeCategoryFilters,
    activeDifficultyFilters,
    activePricingFilters,
    activeHostingFilters,
    onFiltersChange,
  ])

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults(null)
      return
    }

    const filtered = matchSorter(projects, query, {
      keys: [
        { key: "name", maxRanking: matchSorter.rankings.STARTS_WITH },
        { key: "tags", threshold: matchSorter.rankings.CONTAINS },
        { key: "language", threshold: matchSorter.rankings.CONTAINS },
        { key: "license", threshold: matchSorter.rankings.CONTAINS },
        {
          key: "alternatives.selfHosted",
          threshold: matchSorter.rankings.CONTAINS,
          maxRanking: matchSorter.rankings.MATCHES,
        },
        {
          key: "alternatives.nonSelfHosted",
          threshold: matchSorter.rankings.CONTAINS,
          maxRanking: matchSorter.rankings.MATCHES,
        },
      ],
      sorter: (rankedItems) => rankedItems,
    })

    setSearchResults(filtered)
  }

  const handleSort = (value: string) => {
    setSortOrder(value)
  }

  const handleCategoryFilterToggle = (category: string) => {
    const updated = activeCategoryFilters.includes(category)
      ? activeCategoryFilters.filter((f) => f !== category)
      : [...activeCategoryFilters, category]
    setActiveCategoryFilters(updated)
  }

  const handleDifficultyFilterToggle = (difficulty: string) => {
    const updated = activeDifficultyFilters.includes(difficulty)
      ? activeDifficultyFilters.filter((f) => f !== difficulty)
      : [...activeDifficultyFilters, difficulty]
    setActiveDifficultyFilters(updated)
  }

  const handlePricingFilterToggle = (pricing: string) => {
    const updated = activePricingFilters.includes(pricing)
      ? activePricingFilters.filter((f) => f !== pricing)
      : [...activePricingFilters, pricing]
    setActivePricingFilters(updated)
  }

  const handleHostingFilterToggle = (hosting: string) => {
    const updated = activeHostingFilters.includes(hosting)
      ? activeHostingFilters.filter((f) => f !== hosting)
      : [...activeHostingFilters, hosting]
    setActiveHostingFilters(updated)
  }

  const handleFilterChange = (filterType: string, values: string[]) => {
    switch (filterType) {
      case "category":
        setActiveCategoryFilters(values)
        break
      case "difficulty":
        setActiveDifficultyFilters(values)
        break
      case "pricing":
        setActivePricingFilters(values)
        break
      case "hosting":
        setActiveHostingFilters(values)
        break
    }
  }

  const clearAllFilters = () => {
    // Preserve initial filters when clearing
    setActiveCategoryFilters(initialFilters.categories || [])
    setActiveDifficultyFilters(initialFilters.difficulties || [])
    setActivePricingFilters(initialFilters.pricing || [])
    setActiveHostingFilters(initialFilters.hosting || [])
    setShowFilters(false)
  }

  const value: FilterContextValue = {
    searchQuery,
    searchResults,
    handleSearch,
    sortOrder,
    handleSort,
    activeCategoryFilters,
    activeDifficultyFilters,
    activePricingFilters,
    activeHostingFilters,
    handleCategoryFilterToggle,
    handleDifficultyFilterToggle,
    handlePricingFilterToggle,
    handleHostingFilterToggle,
    handleFilterChange,
    showFilters,
    setShowFilters,
    clearAllFilters,
    hasActiveFilters,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

// Compound Components

interface SearchProps {
  placeholder?: string
  className?: string
}

export const Search: React.FC<SearchProps> = ({ placeholder = "Search projects...", className = "" }) => {
  const { handleSearch } = useFilters()

  return (
    <div className={`flex-1 ${className}`}>
      <SearchBar onSearch={handleSearch} placeholder={placeholder} />
    </div>
  )
}

interface SortProps {
  className?: string
}

export const Sort: React.FC<SortProps> = ({ className = "" }) => {
  const { sortOrder, handleSort } = useFilters()

  return <SortSelect value={sortOrder} onValueChange={handleSort} className={className} />
}

interface ToggleProps {
  className?: string
}

export const Toggle: React.FC<ToggleProps> = ({ className = "" }) => {
  const { showFilters, setShowFilters, hasActiveFilters } = useFilters()

  return (
    <Button
      variant="outline"
      size="icon"
      className={`h-10 w-10 flex-shrink-0 ${className}`}
      onClick={() => setShowFilters(!showFilters)}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {hasActiveFilters && <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />}
    </Button>
  )
}

interface PanelProps {
  children: ReactNode
  className?: string
}

export const Panel: React.FC<PanelProps> = ({ children, className = "" }) => {
  const { showFilters, hasActiveFilters, clearAllFilters } = useFilters()

  if (!showFilters) return null

  return (
    <div className={`bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-md mb-3 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-7 text-xs flex-shrink-0" onClick={clearAllFilters}>
            Clear all
          </Button>
        )}
      </div>
      <div className="space-y-3 min-w-0">{children}</div>
    </div>
  )
}

interface CategoryFiltersProps {
  filters: FilterOption[]
  className?: string
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ filters, className = "" }) => {
  const { activeCategoryFilters, handleCategoryFilterToggle, handleFilterChange } = useFilters()

  return (
    <FilterBadges
      title="Categories"
      filters={filters}
      activeFilters={activeCategoryFilters}
      onFilterToggle={handleCategoryFilterToggle}
      onClearAll={() => handleFilterChange("category", [])}
      className={className}
    />
  )
}

interface DifficultyFiltersProps {
  filters: FilterOption[]
  className?: string
}

export const DifficultyFilters: React.FC<DifficultyFiltersProps> = ({ filters, className = "" }) => {
  const { activeDifficultyFilters, handleDifficultyFilterToggle, handleFilterChange } = useFilters()

  return (
    <FilterBadges
      title="Difficulty"
      filters={filters}
      activeFilters={activeDifficultyFilters}
      onFilterToggle={handleDifficultyFilterToggle}
      onClearAll={() => handleFilterChange("difficulty", [])}
      variant="outline"
      className={className}
    />
  )
}

interface PricingFiltersProps {
  filters: FilterOption[]
  className?: string
}

export const PricingFilters: React.FC<PricingFiltersProps> = ({ filters, className = "" }) => {
  const { activePricingFilters, handlePricingFilterToggle, handleFilterChange } = useFilters()

  return (
    <FilterBadges
      title="Pricing"
      filters={filters}
      activeFilters={activePricingFilters}
      onFilterToggle={handlePricingFilterToggle}
      onClearAll={() => handleFilterChange("pricing", [])}
      variant="outline"
      className={className}
    />
  )
}

interface HostingFiltersProps {
  filters: FilterOption[]
  className?: string
}

export const HostingFilters: React.FC<HostingFiltersProps> = ({ filters, className = "" }) => {
  const { activeHostingFilters, handleHostingFilterToggle, handleFilterChange } = useFilters()

  return (
    <FilterBadges
      title="Hosting"
      filters={filters}
      activeFilters={activeHostingFilters}
      onFilterToggle={handleHostingFilterToggle}
      onClearAll={() => handleFilterChange("hosting", [])}
      variant="outline"
      className={className}
    />
  )
}

interface PopularAlternativesProps {
  alternatives: string[]
  className?: string
}

export const PopularAlternatives: React.FC<PopularAlternativesProps> = ({ alternatives, className = "" }) => {
  const { handleSearch } = useFilters()

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex-shrink-0">
        Popular alternatives to:
      </span>
      {alternatives.map((alternative) => (
        <Button
          key={alternative}
          variant="outline"
          size="sm"
          className="h-6 text-xs px-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() => handleSearch(alternative)}
        >
          {alternative}
        </Button>
      ))}
    </div>
  )
}

// Main compound component
export const Filters = {
  Provider: FilterProvider,
  Search,
  Sort,
  Toggle,
  Panel,
  CategoryFilters,
  DifficultyFilters,
  PricingFilters,
  HostingFilters,
  PopularAlternatives,
}
