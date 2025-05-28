import { getProjectLogo, ProjectMeta } from "@/lib/projects"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectSelectorProps {
  title: string
  selectedProject: ProjectMeta | null
  excludeProject?: ProjectMeta | null
  availableProjects: ProjectMeta[]
  onProjectSelect: (slug: string) => void
}

export function ProjectSelector({
  title,
  selectedProject,
  excludeProject,
  availableProjects,
  onProjectSelect,
}: ProjectSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-sm">{title}</h3>
      <Select onValueChange={onProjectSelect} value={selectedProject?.slug || ""}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Choose a project..." />
        </SelectTrigger>
        <SelectContent>
          {availableProjects
            .filter((p) => p.slug !== excludeProject?.slug)
            .map((project) => (
              <SelectItem key={project.slug} value={project.slug}>
                {project.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {selectedProject && (
        <div className="mt-3 p-3 rounded-lg border bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2 mb-1">
            <img src={getProjectLogo(selectedProject.slug)} alt="" className="w-5 h-5" />
            <span className="font-medium text-sm">{selectedProject.name}</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3">{selectedProject.description}</p>
        </div>
      )}
    </div>
  )
}
