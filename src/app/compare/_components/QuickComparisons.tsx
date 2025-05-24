import { ProjectMeta, projects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface QuickComparisonsProps {
  onSelectComparison: (project1: ProjectMeta, project2: ProjectMeta) => void;
}

const popularComparisons = [
  {
    project1: "logto",
    project2: "keycloak",
    label: "Logto vs Keycloak",
  },
  {
    project1: "nextcloud",
    project2: "seafile",
    label: "Nextcloud vs Seafile",
  },
  {
    project1: "bitwarden",
    project2: "vaultwarden",
    label: "Bitwarden vs Vaultwarden",
  },
  {
    project1: "keycloak",
    project2: "authentik",
    label: "Keycloak vs Authentik",
  },
  {
    project1: "jellyfin",
    project2: "plex",
    label: "Jellyfin vs Plex",
  },
];

export function QuickComparisons({
  onSelectComparison,
}: QuickComparisonsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Popular Comparisons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularComparisons.map((comparison, index) => {
            const proj1 = projects.find((p) => p.slug === comparison.project1);
            const proj2 = projects.find((p) => p.slug === comparison.project2);

            if (!proj1 || !proj2) return null;

            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 justify-start"
                onClick={() => onSelectComparison(proj1, proj2)}
              >
                <div className="text-left">
                  <div className="font-medium">{comparison.label}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Compare {proj1.name} and {proj2.name}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
