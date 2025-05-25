import React from "react";
import {
  MessageSquare,
  Wrench,
  Film,
  BarChart3,
  LockKeyhole,
  Settings,
  Server,
  Database,
  Globe,
  Zap,
  Code,
  ShieldCheck,
  Smartphone,
  FileText,
  RefreshCw,
  BarChart,
  LineChart,
  Pencil,
  Mail,
  Users,
  Clock,
  Search,
  Headphones,
} from "lucide-react";

// Icon component mapping
const iconComponents: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Code,
  MessageSquare,
  Database,
  ShieldCheck,
  Smartphone,
  Settings,
  FileText,
  Film,
  BarChart3,
  Pencil,
  Globe,
  Users,
  Clock,
  LockKeyhole,
  Wrench,
  RefreshCw,
  Search,
  Server,
  LineChart,
  Headphones,
  BarChart,
  Zap,
  Mail,
};

export const getIconComponent = (
  iconName: string,
  className: string = "w-5 h-5"
): React.ReactNode => {
  const IconComponent = iconComponents[iconName] || Code;
  return <IconComponent className={className} />;
};
