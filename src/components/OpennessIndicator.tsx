"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HelpCircle,
  BadgeCheck,
  CheckCircle,
  AlertTriangle,
  Lock,
  Check,
} from "lucide-react";
import { PricingModel, pricingModelInfo } from "@/lib/pricing-model";
import { HostingType, hostingTypeInfo } from "@/lib/hosting-type";

// Scoring system for pricing models (lower = more open/free)
const getPricingScore = (pricing: PricingModel): number => {
  const scores = {
    [PricingModel.Free]: 0,
    [PricingModel.Donationware]: 0,
    [PricingModel.Freemium]: 2,
    [PricingModel.OpenCore]: 1,
    [PricingModel.Trialware]: 2,
    [PricingModel.Subscription]: 2,
    [PricingModel.EnterpriseLicensing]: 3,
    [PricingModel.PaidOnly]: 3,
  };
  return scores[pricing];
};

// Scoring system for hosting types (lower = more open/flexible)
const getHostingScore = (hosting: HostingType): number => {
  const scores = {
    [HostingType.SelfHosted]: 0,
    [HostingType.Hybrid]: 0,
    [HostingType.SelfHostedSaaS]: 2,
    [HostingType.CloudOnly]: 3,
  };
  return scores[hosting];
};

// Get combined openness assessment based on pricing and hosting
const getCombinedOpenness = (pricing?: PricingModel, hosting?: HostingType) => {
  // If both are missing, show unknown
  if (!pricing && !hosting) {
    return {
      icon: HelpCircle,
      color: "text-gray-500 hover:text-gray-600",
      label: "Unknown",
      description: "Pricing model and hosting type not specified",
    };
  }

  // If only one is missing, still show unknown since we need both for accurate assessment
  if (!pricing || !hosting) {
    return {
      icon: HelpCircle,
      color: "text-gray-500 hover:text-gray-600",
      label: "Partial Info",
      description: `Missing ${
        !pricing ? "pricing model" : "hosting type"
      } information`,
    };
  }

  const pricingScore = getPricingScore(pricing);
  const hostingScore = getHostingScore(hosting);

  // If either score is undefined (unknown enum value), show unknown
  if (pricingScore == null || hostingScore == null) {
    return {
      icon: HelpCircle,
      color: "text-gray-500 hover:text-gray-600",
      label: "Unknown",
      description: "Unrecognized pricing model or hosting type",
    };
  }

  const totalScore = pricingScore + hostingScore;

  // Determine icon and color based on combined score
  if (totalScore === 0) {
    // Free + Self-Hosted = Maximum openness
    return {
      icon: BadgeCheck,
      color: "text-green-600 hover:text-green-700",
      label: "Fully Open",
      description: "Free and self-hostable - maximum freedom and control",
    };
  }
  if (totalScore <= 1) {
    // Very good openness
    return {
      icon: Check,
      color: "text-green-500 hover:text-green-600",
      label: "Open",
      description: "Mostly free with good hosting flexibility",
    };
  }
  if (totalScore <= 3) {
    // Moderate restrictions
    return {
      icon: AlertTriangle,
      color: "text-yellow-500 hover:text-yellow-600",
      label: "Limited",
      description: "Some restrictions on pricing or hosting options",
    };
  }
  // High restrictions
  return {
    icon: Lock,
    color: "text-red-500 hover:text-red-600",
    label: "Restricted",
    description: "Significant limitations on usage or hosting",
  };
};

interface OpennessIndicatorProps {
  pricingModel?: PricingModel;
  hostingType?: HostingType;
}

export const OpennessIndicator: React.FC<OpennessIndicatorProps> = ({
  pricingModel,
  hostingType,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const opennessInfo = getCombinedOpenness(pricingModel, hostingType);

  if (!opennessInfo) return null;

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handlePopoverMouseEnter = () => {
    setIsOpen(true);
  };

  const handlePopoverMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <opennessInfo.icon
            className={`w-3 h-3 ${opennessInfo.color} hover:scale-110 transition-transform`}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align="end"
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handlePopoverMouseLeave}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <opennessInfo.icon className={`w-4 h-4 ${opennessInfo.color}`} />
            <div className="font-semibold">{opennessInfo.label}</div>
          </div>

          <div className="text-sm text-muted-foreground">
            {opennessInfo.description}
          </div>

          <div className="border-t pt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Pricing Model</span>
                {pricingModel && (
                  <Badge
                    variant="outline"
                    className={`text-xs border-none ${pricingModelInfo[pricingModel].color}`}
                  >
                    {pricingModel}
                  </Badge>
                )}
              </div>
              {pricingModel ? (
                <p className="text-xs text-muted-foreground">
                  {pricingModelInfo[pricingModel].description}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No pricing information available
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Hosting Type</span>
                {hostingType && (
                  <Badge
                    variant="outline"
                    className={`text-xs border-none ${hostingTypeInfo[hostingType].color}`}
                  >
                    {hostingType}
                  </Badge>
                )}
              </div>
              {hostingType ? (
                <p className="text-xs text-muted-foreground">
                  {hostingTypeInfo[hostingType].description}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No hosting information available
                </p>
              )}
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Rating Scale:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-3 h-3 text-green-600" />
                  <span>Fully Open - Maximum freedom</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Open - Mostly accessible</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  <span>Limited - Some restrictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-red-500" />
                  <span>Restricted - Significant limitations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
