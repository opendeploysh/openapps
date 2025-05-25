import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import axios from "axios";
import { mdxProjectData } from "../src/lib/projects";

// Parse command line arguments
const args = process.argv.slice(2);
const noWrite = args.includes("--no-write") || args.includes("--dry-run");
const errorOnInvalid =
  args.includes("--error-on-invalid") || args.includes("--strict");
const checkUrls =
  args.includes("--check-urls") || args.includes("--validate-urls");

const getFrontmatter = (file: string) => {
  const source = fs.readFileSync(file, "utf8");
  const output = matter(source);
  return output.data;
};

const validateUrl = async (
  url: string,
  type: string
): Promise<{ valid: boolean; status?: number; error?: string }> => {
  // Check if it's a local file path (starts with /)
  if (url.startsWith("/")) {
    return validateLocalFile(url, type);
  }

  try {
    const response = await axios.head(url, {
      timeout: 10000,
      validateStatus: (status) => status >= 200 && status < 300,
    });
    return { valid: true, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        valid: false,
        status: error.response?.status,
        error: error.response?.status
          ? `HTTP ${error.response.status}`
          : error.message,
      };
    }
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

const validateLocalFile = (
  filePath: string,
  type: string
): { valid: boolean; status?: number; error?: string } => {
  try {
    // Convert URL path to local file system path
    // Remove leading slash and join with public directory
    const localPath = path.join(process.cwd(), "public", filePath.substring(1));

    if (fs.existsSync(localPath)) {
      const stats = fs.statSync(localPath);
      if (stats.isFile()) {
        return { valid: true, status: 200 };
      } else {
        return { valid: false, error: "Path exists but is not a file" };
      }
    } else {
      return { valid: false, error: "File not found" };
    }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
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
let urlErrorCount = 0;
let warningCount = 0;

const processFile = async (file: string) => {
  const data = getFrontmatter(file);
  const result = mdxProjectData.safeParse(data);
  const relativePath = path.relative(process.cwd(), file);

  if (!result.success) {
    invalidCount++;
    console.error(`❌ Validation failed for project: ${relativePath}`);
    console.error(`Error:`, JSON.stringify(result.error.format(), null, 2));

    if (errorOnInvalid) {
      console.error(`\n💥 Exiting due to --error-on-invalid flag`);
      process.exit(1);
    }
    return { file, result, valid: false };
  }

  // Validate URLs (logo, heroImage, and urls section)
  if (!checkUrls) {
    console.log(`✅ Valid: ${relativePath}`);
    return { file, result, valid: true };
  }

  const urlValidations: Promise<void>[] = [];

  if (data.logo) {
    urlValidations.push(
      validateUrl(data.logo, "logo").then((validation) => {
        if (!validation.valid) {
          urlErrorCount++;
          warningCount++;
          console.warn(
            `⚠️  Logo URL issue in ${relativePath}: ${validation.error}`
          );
          if (errorOnInvalid) {
            console.error(
              `\n💥 Exiting due to --error-on-invalid flag (logo validation failed)`
            );
            process.exit(1);
          }
        }
      })
    );
  }

  if (data.heroImage) {
    urlValidations.push(
      validateUrl(data.heroImage, "heroImage").then((validation) => {
        if (!validation.valid) {
          urlErrorCount++;
          warningCount++;
          console.warn(
            `⚠️  Hero image URL issue in ${relativePath}: ${validation.error}`
          );
          if (errorOnInvalid) {
            console.error(
              `\n💥 Exiting due to --error-on-invalid flag (hero image validation failed)`
            );
            process.exit(1);
          }
        }
      })
    );
  }

  // Validate URLs in the urls section
  if (data.urls && typeof data.urls === "object") {
    for (const [urlType, url] of Object.entries(data.urls)) {
      if (url && typeof url === "string") {
        urlValidations.push(
          validateUrl(url, `urls.${urlType}`).then((validation) => {
            if (!validation.valid) {
              urlErrorCount++;
              warningCount++;
              console.warn(
                `⚠️  URL issue in ${relativePath} (${urlType}): ${validation.error}`
              );
              if (errorOnInvalid) {
                console.error(
                  `\n💥 Exiting due to --error-on-invalid flag (${urlType} URL validation failed)`
                );
                process.exit(1);
              }
            }
          })
        );
      }
    }
  }

  // Wait for all URL validations to complete
  await Promise.all(urlValidations);

  console.log(`✅ Valid: ${relativePath}`);
  return { file, result, valid: true };
};

// Process all files with URL validation
const processedFiles = [];
for (const file of allFiles) {
  const processed = await processFile(file);
  processedFiles.push(processed);
}

const projectMatter = processedFiles
  .filter(({ valid }) => valid)
  .map(({ result }) => result.data);

console.log(`\n📊 Summary:`);
console.log(`  Valid projects: ${projectMatter.length}`);
console.log(`  Invalid projects: ${invalidCount}`);
console.log(`  Warnings: ${warningCount}`);
if (checkUrls) {
  console.log(`  URL issues: ${urlErrorCount}`);
} else {
  console.log(`  URL checking: Disabled`);
}
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

if (urlErrorCount > 0 && !errorOnInvalid && checkUrls) {
  console.log(
    `\n⚠️  ${urlErrorCount} URL issues found. Use --error-on-invalid to fail on URL validation errors.`
  );
}
