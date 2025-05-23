import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ServerCog, ExternalLink } from "lucide-react";
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
import Image from "next/image";
import { ProjectMeta } from "@/lib/projects";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export const ProjectCard = ({
  name,
  description,
  stars,
  deployment,
  categories,
  logo,
}: ProjectMeta) => {
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
  const managedSolution = { available: false };
  const [showServiceOptions, setShowServiceOptions] = useState(false);

  // Define difficulty colors
  const difficultyColor = {
    Easy: "text-green-600 dark:text-green-400",
    Medium: "text-yellow-600 dark:text-yellow-400",
    Advanced: "text-red-600 dark:text-red-400",
  };

  return (
    <Card className="flex flex-col border overflow-hidden shadow-none h-[300px] gap-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-7 h-7 rounded border p-0.5">
            <Image
              src={logo.dark}
              alt={name}
              width={32}
              height={32}
              className="object-cover rounded"
            />
          </div>
          {name}
        </CardTitle>

        <CardDescription className="text-sm line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      {categories && categories.length > 0 && (
        <CardContent className="pt-3">
          <div className="flex flex-wrap gap-1 py-0 text-xs">
            {categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}

      <CardFooter className="flex flex-col text-left mt-auto gap-2 pt-2">
        <div className="flex items-center gap-4 text-xs w-full">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 mr-0.5 text-yellow-400 flex-shrink-0" />
            Stars
          </div>
          <div className="flex-grow border-t" />
          <span className="flex-shrink-0">{stars.toLocaleString()}</span>
        </div>

        {deployment && deployment.difficulty && (
          <div className="flex items-center gap-4 text-xs w-full">
            <div className="flex items-center gap-1">
              <ServerCog className="w-3 h-3 mr-0.5 flex-shrink-0" />
              Self-Hosting
            </div>
            <div className="flex-grow border-t" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className={`flex-shrink-0 ${
                      difficultyColor[deployment.difficulty]
                    }`}
                  >
                    {deployment.difficulty}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="text-xs w-[400px]">
                  {deployment.justification}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                Deploy
              </span>
              {/* {serviceDeployment?.available && (
                <Badge
                  variant="outline"
                  className="bg-white/10 dark:bg-black/10 ml-1 text-[10px]"
                >
                  {serviceDeployment.cost}/mo
                </Badge>
              )} */}
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
                    Option 1
                  </Badge>
                  Deploy with Podlify
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
                  Deploy with Podlify
                </Button>
              </div>

              {/* Option 2: Managed Solution if available */}
              {/* {managedSolution?.available && (
                <div className="bg-neutral-100 dark:bg-neutral-800/50 p-3 rounded-md">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Badge variant="secondary">Option 2</Badge>
                    {managedSolution.name}
                  </h3>
                  <p className="text-sm mb-2">
                    Official managed solution by {name}
                  </p>
                  <ul className="text-xs space-y-1 mb-3">
                    <li className="flex justify-between">
                      <span>Cost:</span>
                      <span className="font-medium">
                        {managedSolution.cost}
                      </span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(managedSolution.url, "_blank")}
                  >
                    Learn more <ExternalLink className="ml-1 w-3 h-3" />
                  </Button>
                </div>
              )} */}

              {/* Option 3: Self-Hosting */}
              <div className="bg-neutral-50 dark:bg-neutral-900/30 p-3 rounded-md">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Badge variant="outline">
                    Option {managedSolution.available ? "3" : "2"}
                  </Badge>
                  Self-Hosting
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
                        onClick={() => window.open(option.url, "_blank")}
                      >
                        {option.name} <ExternalLink className="h-3 w-3" />
                      </Button>
                    ))}
                  </div>
                </div>
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
  );
};
