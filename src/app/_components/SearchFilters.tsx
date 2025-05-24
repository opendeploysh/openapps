import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  SlidersHorizontal,
  CheckCircle,
  FolderArchive,
  MessageSquare,
  Wrench,
  Film,
  BarChart3,
  LockKeyhole,
  Settings,
} from "lucide-react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (categoryName: string) => void;
  onClearFilters: () => void;
  activeFilter: string | null;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export const SearchFilters = ({
  onSearch,
  onCategoryFilter,
  onClearFilters,
  activeFilter,
  showFilters,
  setShowFilters,
  sortOrder,
  setSortOrder,
}: SearchFiltersProps) => {
  // Categories with Lucide icons
  const categories = [
    { name: "Productivity", icon: <CheckCircle className="w-3 h-3" /> },
    { name: "File Storage", icon: <FolderArchive className="w-3 h-3" /> },
    { name: "Communication", icon: <MessageSquare className="w-3 h-3" /> },
    { name: "Development", icon: <Wrench className="w-3 h-3" /> },
    { name: "Media", icon: <Film className="w-3 h-3" /> },
    { name: "Analytics", icon: <BarChart3 className="w-3 h-3" /> },
    { name: "Security", icon: <LockKeyhole className="w-3 h-3" /> },
    { name: "Automation", icon: <Settings className="w-3 h-3" /> },
  ];

  return (
    <section className="mb-4">
      <div>
        <div className="flex gap-2 mb-3 items-center">
          <div className="flex-1">
            <SearchBar onSearch={onSearch} />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Select
              defaultValue="relevance"
              onValueChange={(value) => setSortOrder(value)}
            >
              <SelectTrigger className="h-10 w-[140px]">
                <div className="flex items-center gap-1">
                  <ArrowUpDown className="h-3.5 w-3.5 text-neutral-500" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="difficulty-asc">Easiest First</SelectItem>
                <SelectItem value="difficulty-desc">Advanced First</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-md mb-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  onClearFilters();
                  setShowFilters(false);
                }}
              >
                Clear all
              </Button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mr-1">
                Categories:
              </span>
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant={
                    activeFilter === category.name ? "default" : "secondary"
                  }
                  className="px-2 py-0.5 text-sm cursor-pointer flex items-center gap-1"
                  onClick={() => onCategoryFilter(category.name)}
                >
                  <div className="w-3 h-3">{category.icon}</div>
                  {category.name}
                </Badge>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mr-1">
                Popular alternatives to:
              </span>
              {["Google Drive", "Slack", "GitHub", "Plex", "LastPass"].map(
                (tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-2 py-0.5 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => onSearch(tag)}
                  >
                    {tag}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
