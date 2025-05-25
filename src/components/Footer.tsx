import { Container } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 text-center py-10">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
            <div className="text-white font-bold text-xs">
              <Container className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-medium">OpenApps</div>
        </div>

        <div className="flex space-x-6 mb-6">
          <a
            href="#"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Documentation
          </a>
          <a
            href="#"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} OpenApps. All rights reserved.</p>
          <p className="mt-1">Discover. Compare. Deploy.</p>
        </div>
      </div>
    </footer>
  );
};
