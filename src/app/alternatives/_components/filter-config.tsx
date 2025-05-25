import { FilterOption } from "@/components/filters"
import { CheckCircle, FolderArchive, MessageSquare, Wrench, Film, BarChart3, LockKeyhole, Settings } from "lucide-react"

export const categoryFilters: FilterOption[] = [
  {
    value: "Productivity",
    label: "Productivity",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  {
    value: "File Storage",
    label: "File Storage",
    icon: <FolderArchive className="w-3 h-3" />,
  },
  {
    value: "Communication",
    label: "Communication",
    icon: <MessageSquare className="w-3 h-3" />,
  },
  {
    value: "Development",
    label: "Development",
    icon: <Wrench className="w-3 h-3" />,
  },
  { value: "Media", label: "Media", icon: <Film className="w-3 h-3" /> },
  {
    value: "Analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-3 h-3" />,
  },
  {
    value: "Security",
    label: "Security",
    icon: <LockKeyhole className="w-3 h-3" />,
  },
  {
    value: "Automation",
    label: "Automation",
    icon: <Settings className="w-3 h-3" />,
  },
]

export const difficultyFilters: FilterOption[] = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Advanced", label: "Advanced" },
]
