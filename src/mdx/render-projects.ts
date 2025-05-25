import path from "node:path";
import fs from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export const projectsPath = "projects";

const getSourcePath = (slug: string) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    path.join(process.cwd(), "projects", project.category, project.slug) +
    ".mdx"
  );
};

export const useCompile = async (file: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const components = useMDXComponents({});
  let source = "";
  try {
    source = fs.readFileSync(file, "utf8");
  } catch {
    notFound();
  }
  const { frontmatter, ...content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [],
        remarkPlugins: [],
      },
      parseFrontmatter: true,
    },
    components,
  });
  return {
    source,
    frontmatter: frontmatter as {
      category: string;
      title: string;
      posted?: string;
      description: string;
      image?: string;
      audio?: string;
      authors: { name: string; github: string; avatar: string }[];
    },
    ...content,
  };
};

export const useCompileFromSlug = (slug: string) => {
  const source = getSourcePath(slug)!;
  return useCompile(source);
};
