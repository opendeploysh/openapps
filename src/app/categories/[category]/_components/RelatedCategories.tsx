import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/projects";
import { getIconComponent } from "@/lib/icon-utils";

interface Category {
  name: string;
  iconName: string;
  color: string;
  description: string;
}

interface RelatedCategoriesProps {
  allCategories: Category[];
  currentCategoryName: string;
  getColorClasses: (color: string) => {
    bg: string;
    text: string;
    darkBg: string;
    darkText: string;
    hover: string;
  };
}

export const RelatedCategories: React.FC<RelatedCategoriesProps> = ({
  allCategories,
  currentCategoryName,
  getColorClasses,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Related Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {allCategories
          .filter((cat) => cat.name !== currentCategoryName)
          .slice(0, 8)
          .map((relatedCat) => {
            const catColors = getColorClasses(relatedCat.color);
            const relatedSlug = relatedCat.name
              .toLowerCase()
              .replace(/\s+/g, "-");
            const relatedProjectCount = projects.filter((p) =>
              p.tags.some(
                (cat) => cat.toLowerCase().replace(/\s+/g, "-") === relatedSlug
              )
            ).length;

            return (
              <Link href={`/categories/${relatedSlug}`} key={relatedCat.name}>
                <Card
                  className={`cursor-pointer transition-all ${catColors.hover} h-full`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-md ${catColors.bg} ${catColors.darkBg} flex items-center justify-center`}
                      >
                        <div
                          className={`${catColors.text} ${catColors.darkText}`}
                        >
                          {getIconComponent(relatedCat.iconName, "w-4 h-4")}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm capitalize">
                          {relatedCat.name}
                        </h3>
                        <div className="text-xs text-neutral-500">
                          {relatedProjectCount} projects
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
