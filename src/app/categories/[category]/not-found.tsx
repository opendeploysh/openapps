import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Info } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Link href="/categories">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Categories
          </Button>
        </Link>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mb-4">
            <Info className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Category not found</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The category you're looking for doesn't exist or may have been
            moved.
          </p>
          <Link href="/categories">
            <Button>Browse All Categories</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
