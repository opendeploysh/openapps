"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchBar = ({
  onSearch,
  placeholder = "Search for self-hostable alternatives...",
  className = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute left-2.5 h-full flex items-center text-neutral-400">
        <Search className="w-4 h-4" />
      </div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-10 px-3 pl-8 rounded-md text-sm"
      />
    </div>
  );
};
