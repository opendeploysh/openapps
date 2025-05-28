import { projects } from "@/lib/projects"
import _ from "lodash"

// Icon name mapping for tags (to be used with client-side icon components)
export const categoryIconNames: Record<string, string> = {
  "Developer Tools": "Code",
  Communication: "MessageSquare",
  Database: "Database",
  Cybersecurity: "ShieldCheck",
  "E-commerce": "Smartphone",
  Automation: "Settings",
  Documentation: "FileText",
  Video: "Film",
  Analytics: "BarChart3",
  Notetaking: "Pencil",
  Design: "Pencil",
  CMS: "Globe",
  "Social Media": "Users",
  "Project Management": "Clock",
  "Auth & SSO": "LockKeyhole",
  "Internal Tools": "Wrench",
  "Product Management": "RefreshCw",
  "Password Managers": "LockKeyhole",
  CRM: "Users",
  "Enterprise Search": "Search",
  "API Platform": "Code",
  "Platform as a Service": "Server",
  Monitoring: "LineChart",
  Deployment: "RefreshCw",
  Gaming: "Headphones",
  Community: "Users",
  Music: "Headphones",
  "Backend Service": "Server",
  Utilities: "Wrench",
  Finances: "BarChart",
  Scheduling: "Clock",
  Cloud: "Globe",
  "Visual Database": "Database",
  "ML Ops": "LineChart",
  "ETL/ELT": "RefreshCw",
  "3D Modelling": "Pencil",
  IoT: "Zap",
  "Email Marketing": "Mail",
  // Add more common category mappings
  business: "BarChart",
  finance: "BarChart",
  accounting: "BarChart",
  invoicing: "FileText",
  media: "Film",
  storage: "Database",
  backup: "Server",
  encryption: "LockKeyhole",
  containers: "Server",
  registry: "Database",
  security: "ShieldCheck",
  devops: "Wrench",
  monitoring: "LineChart",
  observability: "BarChart3",
  visualization: "BarChart3",
  collaboration: "Users",
  automation: "Settings",
  workflow: "Settings",
  social: "Users",
  messenger: "MessageSquare",
  chat: "MessageSquare",
  streaming: "Film",
  photos: "Film",
  photography: "Film",
}

// Default colors for tags
export const categoryColors = [
  "blue",
  "violet",
  "cyan",
  "green",
  "amber",
  "orange",
  "sky",
  "red",
  "purple",
  "slate",
  "fuchsia",
  "emerald",
]

// Color utility function
export const getColorClasses = (color: string) => {
  const colorMap: {
    [key: string]: {
      bg: string
      text: string
      darkBg: string
      darkText: string
      hover: string
    }
  } = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      darkBg: "dark:bg-blue-900/30",
      darkText: "dark:text-blue-400",
      hover: "hover:bg-blue-200 dark:hover:bg-blue-900/50",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      darkBg: "dark:bg-amber-900/30",
      darkText: "dark:text-amber-400",
      hover: "hover:bg-amber-200 dark:hover:bg-amber-900/50",
    },
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
      darkBg: "dark:bg-violet-900/30",
      darkText: "dark:text-violet-400",
      hover: "hover:bg-violet-200 dark:hover:bg-violet-900/50",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      darkBg: "dark:bg-emerald-900/30",
      darkText: "dark:text-emerald-400",
      hover: "hover:bg-emerald-200 dark:hover:bg-emerald-900/50",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      darkBg: "dark:bg-red-900/30",
      darkText: "dark:text-red-400",
      hover: "hover:bg-red-200 dark:hover:bg-red-900/50",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      darkBg: "dark:bg-purple-900/30",
      darkText: "dark:text-purple-400",
      hover: "hover:bg-purple-200 dark:hover:bg-purple-900/50",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      darkBg: "dark:bg-green-900/30",
      darkText: "dark:text-green-400",
      hover: "hover:bg-green-200 dark:hover:bg-green-900/50",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      darkBg: "dark:bg-orange-900/30",
      darkText: "dark:text-orange-400",
      hover: "hover:bg-orange-200 dark:hover:bg-orange-900/50",
    },
    slate: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      darkBg: "dark:bg-slate-800/50",
      darkText: "dark:text-slate-400",
      hover: "hover:bg-slate-200 dark:hover:bg-slate-800/70",
    },
    cyan: {
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      darkBg: "dark:bg-cyan-900/30",
      darkText: "dark:text-cyan-400",
      hover: "hover:bg-cyan-200 dark:hover:bg-cyan-900/50",
    },
    sky: {
      bg: "bg-sky-100",
      text: "text-sky-600",
      darkBg: "dark:bg-sky-900/30",
      darkText: "dark:text-sky-400",
      hover: "hover:bg-sky-200 dark:hover:bg-sky-900/50",
    },
    fuchsia: {
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-600",
      darkBg: "dark:bg-fuchsia-900/30",
      darkText: "dark:text-fuchsia-400",
      hover: "hover:bg-fuchsia-200 dark:hover:bg-fuchsia-900/50",
    },
  }

  return colorMap[color] || colorMap.blue
}

export interface CategoryData {
  name: string
  iconName: string
  color: string
  description: string
}

// Generate all categories from project data (server-side safe)
export const getAllCategoriesData = (): CategoryData[] => {
  return _.chain(projects)
    .flatMap((project) => [project.category.toLowerCase(), ...project.tags])
    .uniq()
    .map((cat, index) => ({
      name: cat,
      iconName: categoryIconNames[cat] || "Code",
      color: categoryColors[index % categoryColors.length],
      description: `Projects in the ${cat} category`,
    }))
    .value()
}

// Get projects for a specific category
export const getCategoryProjects = (categorySlug: string) => {
  return projects.filter((p) => p.tags.some((cat) => cat.toLowerCase().replace(/\s+/g, "-") === categorySlug))
}

// Find category by slug
export const findCategoryDataBySlug = (categorySlug: string): CategoryData | undefined => {
  const allCategories = getAllCategoriesData()
  return allCategories.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === categorySlug)
}
