import React from "react"
import { ProjectCard } from "./ProjectCard"
import { ProjectMeta } from "@/lib/projects"
import { PricingModel } from "@/lib/pricing-model"
import { HostingType } from "@/lib/hosting-type"

interface AlternativesProjectCardProps extends ProjectMeta {
  showLicense?: boolean
  pricingModel?: PricingModel
  hostingType?: HostingType
}

export const AlternativesProjectCard: React.FC<AlternativesProjectCardProps> = (props) => {
  return <ProjectCard {...props} linkTo="alternatives" />
}
