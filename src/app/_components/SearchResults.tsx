import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectMeta } from "@/lib/projects";
import { Filter } from "lucide-react";

interface SearchResultsProps {
  searchResults: ProjectMeta[];
  activeFilter: string | null;
  onClearFilters: () => void;
}

export const SearchResults = ({
  searchResults,
  activeFilter,
  onClearFilters,
}: SearchResultsProps) => {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">
          {searchResults.length > 0
            ? activeFilter
              ? `${activeFilter} (${searchResults.length})`
              : `Search Results (${searchResults.length})`
            : "No alternatives found"}
        </h2>
        {activeFilter && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="gap-1"
          >
            <Filter className="w-4 h-4" />
            Clear Filter
          </Button>
        )}
      </div>
      {searchResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {searchResults.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      )}
    </section>
  );
};
