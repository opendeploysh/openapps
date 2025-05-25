import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Compass,
  Container,
  ChevronDown,
  Menu,
  X,
  Search,
  ArrowUpDown,
  CheckCircle,
  Star,
  Sparkles,
  Layout,
  HardDrive,
  Github,
  Heart,
  Code,
  MessageSquare,
  Database,
  ShieldCheck,
  Settings,
  Film,
  BarChart3,
  Server,
  Globe,
  Scale,
  GitCompare,
} from "lucide-react";

// Define basic categories for the navigation menu
const navCategories = [
  { name: "Productivity", icon: <CheckCircle className="h-3 w-3" /> },
  { name: "Development", icon: <Code className="h-3 w-3" /> },
  { name: "Communication", icon: <MessageSquare className="h-3 w-3" /> },
  { name: "Databases", icon: <Database className="h-3 w-3" /> },
  { name: "Security", icon: <ShieldCheck className="h-3 w-3" /> },
  { name: "Automation", icon: <Settings className="h-3 w-3" /> },
  { name: "Media", icon: <Film className="h-3 w-3" /> },
  { name: "Analytics", icon: <BarChart3 className="h-3 w-3" /> },
  { name: "Infrastructure", icon: <Server className="h-3 w-3" /> },
  { name: "Web", icon: <Globe className="h-3 w-3" /> },
];

export const Navbar = () => {
  return (
    <>
      <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-1">
              <div className="mr-1 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600">
                <Container className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-black dark:text-white">Hostable</span>
                <span className="text-blue-600">.tools</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                    <Compass className="h-4 w-4" />
                    Discover
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="w-[220px]">
                  <DropdownMenuLabel>Discover</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                      <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>Featured Alternatives</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-teal-100 dark:bg-teal-900">
                      <ArrowUpDown className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span>Trending Projects</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-amber-100 dark:bg-amber-900">
                      <Star className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span>Most Popular</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded flex items-center justify-center bg-violet-100 dark:bg-violet-900">
                      <Sparkles className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span>Recently Added</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Search className="h-4 w-4 mr-1" />
                    <span>Advanced Search</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                    <Layout className="h-4 w-4" />
                    Categories
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[220px]">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/categories" className="w-full">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <div className="h-5 w-5 rounded flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                        <Layout className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>All Categories</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  {navCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/categories/${category.name.toLowerCase()}`}
                      className="w-full"
                    >
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <div className="h-5 w-5 rounded flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                          {category.icon}
                        </div>
                        <span>{category.name}</span>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/alternatives">
                <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                  <ArrowUpDown className="h-4 w-4" />
                  Alternatives
                </Button>
              </Link>

              <Link href="/compare">
                <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                  <GitCompare className="h-4 w-4" />
                  Compare
                </Button>
              </Link>

              <Link href="/licenses">
                <Button variant="ghost" size="sm" className="h-9 gap-1.5">
                  <Scale className="h-4 w-4" />
                  Licenses
                </Button>
              </Link>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="sm" className="h-9 hidden md:flex">
                Get Started
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 md:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden">
        <div className="absolute right-0 top-0 h-full w-[280px] bg-white dark:bg-neutral-900 shadow-xl p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <div className="mr-1 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600">
                <Container className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-black dark:text-white">Hostable</span>
                <span className="text-blue-600">.tools</span>
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start h-10 gap-2"
            >
              <Compass className="h-4 w-4" />
              Discover
            </Button>

            <div className="pl-8 space-y-1 my-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 text-sm"
              >
                Featured Alternatives
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 text-sm"
              >
                Trending Projects
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 text-sm"
              >
                Most Popular
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 text-sm"
              >
                Recently Added
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start h-10 gap-2"
            >
              <Layout className="h-4 w-4" />
              Categories
            </Button>

            <div className="pl-8 space-y-1 my-2">
              <Link href="/categories" className="w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 text-sm gap-2"
                >
                  <Layout className="h-3 w-3" />
                  All Categories
                </Button>
              </Link>
              {navCategories.map((category) => (
                <Link
                  key={category.name}
                  href={`/categories/${category.name.toLowerCase()}`}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-8 text-sm gap-2"
                  >
                    {category.icon}
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>

            <Link href="/alternatives" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-10 gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                Alternatives
              </Button>
            </Link>

            <Link href="/compare" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-10 gap-2"
              >
                <GitCompare className="h-4 w-4" />
                Compare
              </Button>
            </Link>

            <Link href="/licenses" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-10 gap-2"
              >
                <Scale className="h-4 w-4" />
                Licenses
              </Button>
            </Link>
          </div>

          <div className="mt-6">
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </>
  );
};
