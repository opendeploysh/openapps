import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { mdxProjectData } from "../src/lib/projects";

// Parse command line arguments
const args = process.argv.slice(2);
const noWrite = args.includes("--no-write") || args.includes("--dry-run");
const errorOnInvalid =
  args.includes("--error-on-invalid") || args.includes("--strict");

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

const allFiles = getAllProjectMdxFiles();
console.log(`Found ${allFiles.length} MDX files`);

let invalidCount = 0;
const projectMatter = allFiles
  .map((file) => {
    const data = getFrontmatter(file);
    const result = mdxProjectData.safeParse(data);

    if (!result.success) {
      invalidCount++;
      console.error(
        `❌ Validation failed for project: ${path.relative(
          process.cwd(),
          file
        )}`
      );
      console.error(`Error:`, JSON.stringify(result.error.format(), null, 2));

      if (errorOnInvalid) {
        console.error(`\n💥 Exiting due to --error-on-invalid flag`);
        process.exit(1);
      }
    } else {
      console.log(`✅ Valid: ${path.relative(process.cwd(), file)}`);
    }

    return { file, result };
  })
  .filter(({ result }) => result.success)
  .map(({ result }) => result.data);

console.log(`\n📊 Summary:`);
console.log(`  Valid projects: ${projectMatter.length}`);
console.log(`  Invalid projects: ${invalidCount}`);
console.log(`  Total files: ${allFiles.length}`);

if (noWrite) {
  console.log(`\n🚫 File writing disabled (--no-write flag)`);
  console.log(
    `Would write ${projectMatter.length} projects to src/lib/projects.json`
  );
} else {
  const outputPath = path.join(process.cwd(), "src", "lib", "projects.json");
  fs.writeFileSync(outputPath, JSON.stringify(projectMatter, null, 2));
  console.log(
    `\n✅ Written ${projectMatter.length} projects to ${path.relative(
      process.cwd(),
      outputPath
    )}`
  );
}

if (invalidCount > 0 && !errorOnInvalid) {
  console.log(
    `\n⚠️  ${invalidCount} invalid projects were skipped. Use --error-on-invalid to fail on validation errors.`
  );
}
