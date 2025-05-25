import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { getIconComponent } from "@/lib/icon-utils";

interface CategoryHeaderProps {
  category: {
    name: string;
    iconName: string;
    color: string;
    description: string;
  };
  projectCount: number;
  colors: {
    bg: string;
    text: string;
    darkBg: string;
    darkText: string;
    hover: string;
  };
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  projectCount,
  colors,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-6">
        <div
          className={`h-16 w-16 rounded-lg ${colors.bg} ${colors.darkBg} flex items-center justify-center flex-shrink-0`}
        >
          <div className={`${colors.text} ${colors.darkText}`}>
            {getIconComponent(category.iconName)}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2 capitalize">
            {category.name}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-2xl">
            {category.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              {projectCount} projects
            </Badge>
            <Badge variant="outline">Open Source</Badge>
            <Badge variant="outline">Self-Hostable</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
