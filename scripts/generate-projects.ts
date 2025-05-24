import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { mdxProjectData } from "../src/lib/projects";

const getFrontmatter = (file: string) => {
  const source = fs.readFileSync(file, "utf8");
  const output = matter(source);
  return output.data;
};

const getAllProjectMdxFiles = () => {
  const contentDir = path.join(process.cwd(), "projects");

  const walkDir = (dir: string): string[] => {
    const files: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...walkDir(fullPath));
      }
      if (item.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }

    return files;
  };

  return walkDir(contentDir);
};

const projectMatter = getAllProjectMdxFiles()
  .map(getFrontmatter)
  .map((data) => {
    const result = mdxProjectData.safeParse(data);
    if (!result.success) {
      console.log(`Validation failed for project:`, data);
      console.log(`Error:`, result.error.message);
    }

    return result;
  })
  .filter((result) => result.success)
  .map((result) => result.data);

const outputPath = path.join(process.cwd(), ".next", "cache", "projects.json");
fs.writeFileSync(outputPath, JSON.stringify(projectMatter, null, 2));
