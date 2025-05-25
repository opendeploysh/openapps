import { ProjectMeta } from "@/lib/projects";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface FeatureComparisonProps {
  project1: ProjectMeta;
  project2: ProjectMeta;
}

interface FeatureInfo {
  name: string;
  value?: string;
}

// Collect all unique features from both projects
const getAllFeatures = (project1: ProjectMeta, project2: ProjectMeta) => {
  const features = new Map<string, Map<string, FeatureInfo>>();

  [project1, project2].forEach((project) => {
    if (project?.featureGroups) {
      project.featureGroups.forEach((group) => {
        if (!features.has(group.name)) {
          features.set(group.name, new Map());
        }
        group.features.forEach((feature) => {
          const groupFeatures = features.get(group.name)!;
          if (!groupFeatures.has(feature.name)) {
            groupFeatures.set(feature.name, {
              name: feature.name,
              value: feature.value,
            });
          } else {
            // If feature exists, prefer the one with a value
            const existing = groupFeatures.get(feature.name)!;
            if (feature.value && !existing.value) {
              groupFeatures.set(feature.name, {
                name: feature.name,
                value: feature.value,
              });
            }
          }
        });
      });
    }
  });

  return features;
};

// Check if a project supports a specific feature and return feature info
const getProjectFeature = (
  project: ProjectMeta | null,
  groupName: string,
  featureName: string
): FeatureInfo | null => {
  if (!project?.featureGroups) return null;

  const group = project.featureGroups.find((g) => g.name === groupName);
  if (!group) return null;

  const feature = group.features.find((f) => f.name === featureName);
  if (!feature) return null;

  return {
    name: feature.name,
    value: feature.value,
  };
};

export function FeatureComparison({
  project1,
  project2,
}: FeatureComparisonProps) {
  const allFeatures = getAllFeatures(project1, project2);

  if (allFeatures.size === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            No detailed feature comparison available for these projects.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-0 gap-0">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-bold">Feature Comparison</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Detailed feature support comparison
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
              <th className="text-left p-3 font-medium text-neutral-600 dark:text-neutral-400 text-sm">
                Feature Category
              </th>
              <th className="text-center p-3 font-medium text-sm">
                {project1.name}
              </th>
              <th className="text-center p-3 font-medium text-sm">
                {project2.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(allFeatures.entries()).map(([groupName, features]) => (
              <>
                {/* Group Header Row */}
                <tr
                  key={`group-${groupName}`}
                  className="bg-neutral-100 dark:bg-neutral-800"
                >
                  <td
                    colSpan={3}
                    className="p-3 font-semibold text-neutral-900 dark:text-neutral-100 text-sm border-b border-neutral-200 dark:border-neutral-700 border-t"
                  >
                    {groupName}
                  </td>
                </tr>
                {/* Feature Rows */}
                {Array.from(features.values()).map(
                  (featureInfo, featureIndex) => {
                    const project1Feature = getProjectFeature(
                      project1,
                      groupName,
                      featureInfo.name
                    );
                    const project2Feature = getProjectFeature(
                      project2,
                      groupName,
                      featureInfo.name
                    );

                    return (
                      <tr
                        key={`${groupName}-${featureInfo.name}`}
                        className={`border-b border-neutral-100 dark:border-neutral-800 ${
                          featureIndex % 2 === 0
                            ? "bg-white dark:bg-neutral-950"
                            : "bg-neutral-50/50 dark:bg-neutral-900/20"
                        }`}
                      >
                        <td className="p-3 pl-6">
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">
                            {featureInfo.name}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          {project1Feature ? (
                            project1Feature.value ? (
                              <span className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                {project1Feature.value}
                              </span>
                            ) : (
                              <Check className="w-5 h-5 text-green-600 mx-auto" />
                            )
                          ) : (
                            <X className="w-5 h-5 text-red-600 mx-auto" />
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {project2Feature ? (
                            project2Feature.value ? (
                              <span className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                {project2Feature.value}
                              </span>
                            ) : (
                              <Check className="w-5 h-5 text-green-600 mx-auto" />
                            )
                          ) : (
                            <X className="w-5 h-5 text-red-600 mx-auto" />
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
