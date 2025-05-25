import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Edit3, Github } from "lucide-react";
import Link from "next/link";

interface GitHubEditButtonProps {
  filePath: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
  children?: React.ReactNode;
}

const GITHUB_REPO_URL = "https://github.com/opendeploysh/openapps";

export function GitHubEditButton({
  filePath,
  className = "",
  variant = "outline",
  size = "sm",
  showIcon = true,
  children,
}: GitHubEditButtonProps) {
  const editUrl = `${GITHUB_REPO_URL}/edit/main/${filePath}`;

  return (
    <a href={editUrl} target="_blank" rel="noopener noreferrer">
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        title={`Edit ${filePath} on GitHub`}
      >
        {showIcon && <Edit3 className="h-4 w-4" />}
        {children || "Edit on GitHub"}
        <ExternalLink className="h-3 w-3" />
      </Button>
    </a>
  );
}

interface GitHubViewButtonProps {
  filePath: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function GitHubViewButton({
  filePath,
  className = "",
  variant = "ghost",
  size = "sm",
  showIcon = true,
  children,
}: GitHubViewButtonProps) {
  const viewUrl = `${GITHUB_REPO_URL}/blob/main/${filePath}`;

  return (
    <a href={viewUrl} target="_blank" rel="noopener noreferrer">
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        title={`View ${filePath} on GitHub`}
      >
        {showIcon && <Github className="h-4 w-4" />}
        {children || "View Source"}
        <ExternalLink className="h-3 w-3" />
      </Button>
    </a>
  );
}

interface GitHubContributeButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg";
  children?: React.ReactNode;
}

export function GitHubContributeButton({
  className = "",
  variant = "default",
  size = "default",
  children,
}: GitHubContributeButtonProps) {
  return (
    <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        title="Contribute to OpenApps on GitHub"
      >
        <Github className="h-4 w-4" />
        {children || "Contribute on GitHub"}
        <ExternalLink className="h-3 w-3" />
      </Button>
    </a>
  );
}
