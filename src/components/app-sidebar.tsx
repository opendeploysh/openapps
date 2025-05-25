"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Container,
  Layout,
  Compass,
  HardDrive,
  Github,
  Heart,
  Star,
  Sparkles,
  ArrowUpDown,
  CheckCircle,
  Code,
  MessageSquare,
  Database,
  ShieldCheck,
  Settings,
  Film,
  BarChart3,
  Server,
  Globe,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// This is sample data
const data = {
  user: {
    name: "OpenApps User",
    email: "user@openapps.sh",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Discover",
      url: "/",
      icon: Compass,
      isActive: true,
      items: [
        {
          title: "Featured Alternatives",
          url: "/featured",
          icon: CheckCircle,
        },
        {
          title: "Trending Projects",
          url: "/trending",
          icon: ArrowUpDown,
        },
        {
          title: "Most Popular",
          url: "/popular",
          icon: Star,
        },
        {
          title: "Recently Added",
          url: "/recent",
          icon: Sparkles,
        },
      ],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: Layout,
      items: [
        {
          title: "All Categories",
          url: "/categories",
          icon: Layout,
        },
        {
          title: "Development",
          url: "/categories/development",
          icon: Code,
        },
        {
          title: "Communication",
          url: "/categories/communication",
          icon: MessageSquare,
        },
        {
          title: "Databases",
          url: "/categories/databases",
          icon: Database,
        },
        {
          title: "Security",
          url: "/categories/security",
          icon: ShieldCheck,
        },
        {
          title: "Automation",
          url: "/categories/automation",
          icon: Settings,
        },
        {
          title: "Media",
          url: "/categories/media",
          icon: Film,
        },
        {
          title: "Analytics",
          url: "/categories/analytics",
          icon: BarChart3,
        },
        {
          title: "Infrastructure",
          url: "/categories/infrastructure",
          icon: Server,
        },
        {
          title: "Web",
          url: "/categories/web",
          icon: Globe,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Self-Host",
      url: "/self-host",
      icon: HardDrive,
    },
    {
      title: "Open Source",
      url: "/open-source",
      icon: Github,
    },
    {
      title: "Community",
      url: "/community",
      icon: Heart,
    },
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
  ],
  projects: [
    {
      name: "Deployment Manager",
      url: "/deploy",
      icon: Frame,
    },
    {
      name: "Project Analytics",
      url: "/analytics",
      icon: PieChart,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">OpenApps</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
