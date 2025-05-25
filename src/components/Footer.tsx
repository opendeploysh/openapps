import { FolderOpen, Heart } from "lucide-react";
import Link from "next/link";
import { GitHubContributeButton } from "./GitHubEditButton";

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 text-center py-10">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
            <div className="text-white font-bold text-xs">
              <FolderOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-medium">OpenApps</div>
        </div>

        <div className="mb-6">
          <GitHubContributeButton variant="outline" size="sm" className="mb-4">
            <Heart className="w-4 h-4" />
            Contribute to OpenApps
          </GitHubContributeButton>
        </div>

        <div className="flex space-x-6 mb-6">
          <a
            href="/categories"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Categories
          </a>
          <a
            href="/licenses"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Licenses
          </a>
          <a
            href="/compare"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Compare
          </a>
        </div>

        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} OpenApps. All rights reserved.</p>
          <p className="mt-1">Discover. Compare. Deploy.</p>
          <p className="mt-2 text-xs">
            Open source project • Help us improve by{" "}
            <Link
              href="https://github.com/opendeploysh/openapps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              contributing on GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
