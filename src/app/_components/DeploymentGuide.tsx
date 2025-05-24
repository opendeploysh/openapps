import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const DeploymentGuide = () => {
  return (
    <section className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-lg overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f46e5' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Text content */}
        <div className="space-y-4">
          <div className="inline-block text-blue-600 dark:text-blue-400 bg-white dark:bg-blue-900/50 rounded-full px-3 py-1 text-xs font-medium mb-1 shadow-sm">
            Getting Started Guide
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white">
            New to Self-Hosting?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300">
            Self-hosting gives you complete control over your data and
            applications, but it doesn't have to be complicated. Our
            step-by-step guides make it easy to get started.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1 mt-0.5">
                <svg
                  className="w-3 h-3 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Learn the basics of self-hosting and deployment options
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1 mt-0.5">
                <svg
                  className="w-3 h-3 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Understand security best practices for your instances
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1 mt-0.5">
                <svg
                  className="w-3 h-3 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Get resources for backups, monitoring, and maintenance
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="sm" className="h-9">
              Read Our Guides
              <BookOpen className="w-3.5 h-3.5 ml-1.5" />
            </Button>
            <Button size="sm" variant="outline" className="h-9">
              Join Community
            </Button>
          </div>
        </div>

        {/* Right side - Visual content */}
        <div className="hidden md:block bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b border-neutral-200 dark:border-neutral-700 py-3 px-4 flex items-center">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Self-Hosting Guide
              </div>
            </div>
          </div>
          <div className="p-4 text-xs font-mono text-left text-neutral-700 dark:text-neutral-300 h-[250px] overflow-hidden">
            <div className="text-green-600 dark:text-green-400 mb-1">
              $ sudo docker run -d \
            </div>
            <div className="text-neutral-500 pl-4 mb-1">--name nextcloud \</div>
            <div className="text-neutral-500 pl-4 mb-1">-p 8080:80 \</div>
            <div className="text-neutral-500 pl-4 mb-1">
              -v nextcloud:/var/www/html \
            </div>
            <div className="text-neutral-500 pl-4 mb-1">nextcloud</div>
            <div className="text-green-600 dark:text-green-400 mt-3">
              $ docker ps
            </div>
            <div className="text-neutral-500 pl-4 mt-1 whitespace-nowrap">
              CONTAINER ID: 7a9ec52d1b2c
            </div>
            <div className="text-blue-500 pl-4 mt-1">STATUS: Up 2 minutes</div>
            <div className="mt-2 pl-2 text-green-600 dark:text-green-700 animate-pulse">
              Successfully deployed! <span className="animate-blink">▌</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
