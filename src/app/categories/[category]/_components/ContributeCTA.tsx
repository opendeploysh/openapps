import React from "react";
import { Button } from "@/components/ui/button";
import { GitFork } from "lucide-react";

interface ContributeCTAProps {
  categoryName: string;
}

export const ContributeCTA: React.FC<ContributeCTAProps> = ({
  categoryName,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="sm:flex-1">
          <h2 className="text-xl font-bold mb-2 capitalize">
            Know a great {categoryName} project?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Help us grow our collection by suggesting open source{" "}
            {categoryName.toLowerCase()} projects for others to discover.
          </p>
        </div>
        <div>
          <Button className="gap-2">
            <GitFork className="h-4 w-4" />
            Suggest a Project
          </Button>
        </div>
      </div>
    </div>
  );
};
