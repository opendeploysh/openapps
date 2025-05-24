import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const RequestCTA = () => {
  return (
    <section className="text-center mb-8 rounded-lg overflow-hidden relative border border-neutral-200 dark:border-neutral-800">
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900/40"></div>

      <div className="relative py-8 px-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
          <svg
            className="w-6 h-6 text-blue-600 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-2 text-neutral-800 dark:text-white">
          Can't find what you're looking for?
        </h2>

        <p className="mb-6 text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
          We're constantly adding new self-hostable alternatives. Submit a
          request and our team will help find or build the perfect solution for
          your needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="sm" className="h-9">
            Submit Request
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
          <Button size="sm" variant="outline" className="h-9">
            Browse All Solutions
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <span>Average response time:</span>
          <span className="font-medium">Under 24 hours</span>
        </div>
      </div>
    </section>
  );
};
