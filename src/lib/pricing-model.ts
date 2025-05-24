export enum PricingModel {
  Free = "Free",
  Freemium = "Freemium",
  OpenCore = "Open-Core",
  PaidOnly = "Paid Only",
  Subscription = "Subscription",
  Trialware = "Trialware",
  Donationware = "Donationware",
  EnterpriseLicensing = "Enterprise Licensing",
}

export interface PricingModelInfo {
  type: PricingModel;
  description: string;
  color: string;
}

export const pricingModelInfo: Record<PricingModel, PricingModelInfo> = {
  [PricingModel.Free]: {
    type: PricingModel.Free,
    description:
      "Software that is completely free to use without any monetary cost",
    color:
      "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  },
  [PricingModel.Freemium]: {
    type: PricingModel.Freemium,
    description:
      "Basic features are free, but advanced features require payment",
    color: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  },
  [PricingModel.OpenCore]: {
    type: PricingModel.OpenCore,
    description:
      "Core functionality is open source and free, with proprietary premium features",
    color:
      "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
  },
  [PricingModel.PaidOnly]: {
    type: PricingModel.PaidOnly,
    description: "Software requires payment to use, with no free tier",
    color: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
  },
  [PricingModel.Subscription]: {
    type: PricingModel.Subscription,
    description:
      "Recurring payment model with ongoing access to software and updates",
    color:
      "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
  },
  [PricingModel.Trialware]: {
    type: PricingModel.Trialware,
    description:
      "Free trial period followed by required payment for continued use",
    color:
      "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
  },
  [PricingModel.Donationware]: {
    type: PricingModel.Donationware,
    description: "Free to use with optional donations to support development",
    color: "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300",
  },
  [PricingModel.EnterpriseLicensing]: {
    type: PricingModel.EnterpriseLicensing,
    description: "Custom pricing and features for large organizations",
    color:
      "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300",
  },
};

export const getPricingModelColor = (type: PricingModel): string => {
  return pricingModelInfo[type].color;
};
