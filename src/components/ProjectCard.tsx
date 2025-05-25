import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ServerCog,
  ExternalLink,
  Heart,
  ArrowRightLeft,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  getProjectPopularity,
  ProjectMeta,
  projectsWithGitHubData,
} from "@/lib/projects";

import Link from "next/link";
import { PricingModel } from "@/lib/pricing-model";
import { HostingType } from "@/lib/hosting-type";
import { OpennessIndicator } from "./OpennessIndicator";

interface ProjectCardProps extends ProjectMeta {
  showLicense?: boolean;
  pricingModel?: PricingModel;
  hostingType?: HostingType;
}

export const ProjectCard = ({
  name,
  description,
  deployment,
  tags,
  logo,
  slug,
  license,
  showLicense = false,
  pricingModel,
  hostingType,
}: ProjectCardProps) => {
  const serviceDeployment = {
    available: false,
    cost: "$12",
    setupFee: "$12",
  };
  const deployOptions = [
    { name: "Docker", url: "#" },
    { name: "Docker Compose", url: "#" },
    { name: "Kubernetes", url: "#" },
  ];

  const githubData = projectsWithGitHubData[slug];
  const stars = githubData?.stargazers_count ?? 0;
  const projectLicense = license ?? githubData?.license?.spdx_id ?? "Unknown";

  return (
    <Link href={`/projects/${slug}`} className="block">
      <Card
        className={`flex flex-col border overflow-hidden shadow-none ${
          showLicense ? "h-[330px]" : "h-[300px]"
        } gap-0 hover:shadow-md transition-shadow cursor-pointer group relative`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-7 h-7 rounded border p-0.5">
              <img src={logo} alt={name} className="object-cover rounded" />
            </div>
            <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {name}
            </span>

            <div className="flex-grow" />
            <OpennessIndicator
              pricingModel={pricingModel}
              hostingType={hostingType}
            />
          </CardTitle>

          <CardDescription className="text-sm line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>

        {tags && tags.length > 0 && (
          <CardContent className="pt-3">
            <div className="flex flex-wrap gap-1 py-0 text-xs">
              {tags.slice(0, 2).map((category) => (
                <Badge variant="secondary" key={category}>
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col text-left mt-auto gap-2 pt-2">
          <div className="flex items-center gap-4 text-xs w-full">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 mr-0.5 text-yellow-500 flex-shrink-0" />
              Stars
            </div>
            <div className="flex-grow border-t" />
            <span className="flex-shrink-0">
              {stars?.toLocaleString() ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs w-full">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 mr-0.5 text-red-500 flex-shrink-0" />
              Relative Popularity
            </div>
            <div className="flex-grow border-t" />
            <span className="flex-shrink-0">
              {getProjectPopularity(slug).toLocaleString()}
            </span>
          </div>

          {showLicense && (
            <div className="flex items-center gap-4 text-xs w-full">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 mr-0.5 text-blue-500 flex-shrink-0" />
                License
              </div>
              <div className="flex-grow border-t" />
              <span className="flex-shrink-0">{projectLicense}</span>
            </div>
          )}

          {/* Deploy button with dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 text-xs h-8 justify-between group"
              >
                <span className="flex items-center">
                  <ServerCog className="w-3 h-3 mr-1" />
                  Quick Deploy
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Deploy {name}</DialogTitle>
                <DialogDescription>
                  Choose your preferred deployment method
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-3">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Badge variant="default" className="bg-blue-600">
                      Recommended
                    </Badge>
                    Deploy with OpenApps
                  </h3>
                  <p className="text-sm mb-2">
                    The fastest way to get your own {name} instance
                  </p>
                  <ul className="text-xs space-y-1 mb-3">
                    <li className="flex justify-between">
                      <span>Monthly cost:</span>
                      <span className="font-medium">
                        {serviceDeployment?.cost || "$12"}/month
                      </span>
                    </li>
                    {serviceDeployment?.setupFee && (
                      <li className="flex justify-between">
                        <span>One-time setup:</span>
                        <span className="font-medium">
                          {serviceDeployment.setupFee}
                        </span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span>Uptime guarantee:</span>
                      <span className="font-medium">99.9%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Deployment time:</span>
                      <span className="font-medium">5 minutes</span>
                    </li>
                  </ul>
                  <Button size="sm" className="w-full">
                    Deploy with OpenApps
                  </Button>
                </div>

                {/* Self-Hosting */}
                <div className="bg-neutral-50 dark:bg-neutral-900/30 p-3 rounded-md">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Badge variant="outline">Self-Hosting</Badge>
                  </h3>
                  <p className="text-sm mb-2">
                    {deployment?.justification ||
                      "Deploy this project on your own infrastructure"}
                  </p>

                  <div className="mt-3">
                    <p className="text-sm mb-2">Deployment options:</p>
                    <div className="flex flex-col gap-2">
                      {deployOptions.map((option) => (
                        <Button
                          key={option.name}
                          variant="outline"
                          className="justify-between text-sm"
                        >
                          {option.name} <ExternalLink className="h-3 w-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link href={`/projects/${slug}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      View Full Details
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                  <Link href={`/alternatives/${slug}`}>
                    <Button variant="outline" size="sm" className="gap-1 ml-2">
                      See Alternatives
                      <ArrowRightLeft className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <div className="text-xs text-neutral-500">
                  Need help deciding? Contact our deployment specialists.
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </Link>
  );
};
