interface HeroHeaderProps {
  projectCount: number;
}

export const HeroHeader = ({ projectCount }: HeroHeaderProps) => {
  return (
    <header className="flex flex-col items-center text-center mb-8 relative py-20">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-blue-500/5 blur-xl"></div>
        <div className="absolute top-1/2 -right-16 w-40 h-40 rounded-full bg-blue-500/5 blur-2xl"></div>
        <div className="absolute -bottom-10 left-1/3 w-32 h-32 rounded-full bg-blue-500/5 blur-xl"></div>
      </div>

      <div className="mb-6">
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
            <span className="text-black dark:text-white">Open</span>
            <span className="text-blue-600">Apps</span>
          </h1>
        </div>

        <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4">
          Discover. Compare. Deploy.
        </p>

        <div className="max-w-2xl mx-auto space-y-3">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Find, compare, and deploy SaaS alternatives.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Compare features · Deploy yourself · Managed services available
          </p>
        </div>
      </div>

      <div className="flex gap-2 items-center text-sm text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900/50 rounded-full px-4 py-1.5 shadow-sm mb-4">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span>
          {projectCount}+ open source alternatives available for deployment
        </span>
      </div>

      {/* <div className="flex gap-8 items-center justify-center">
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-transparent"></div>
        <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-full px-4 py-1 text-xs">
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            Powered by
          </span>
          <span className="ml-1.5">OpenDeploy</span>
        </div>
        <div className="w-16 h-1 rounded-full bg-gradient-to-l from-blue-500 to-transparent"></div>
      </div> */}
    </header>
  );
};
