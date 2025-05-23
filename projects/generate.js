import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const getFrontmatter = (file) => {
  let source = "";
  try {
    source = fs.readFileSync(file, "utf8");
  } catch {
    notFound();
  }

  const output = matter(source);
  return output.data;
};

const getAllProjectMdxFiles = () => {
  const contentDir = path.join(process.cwd(), "projects");

  const walkDir = (dir) => {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...walkDir(fullPath));
      } else if (item.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }

    return files;
  };

  return walkDir(contentDir);
};

const projectMatter = getAllProjectMdxFiles().map(getFrontmatter);

const outputPath = path.join(process.cwd(), "src", "lib", "projects.json");
fs.writeFileSync(outputPath, JSON.stringify(projectMatter, null, 2));
