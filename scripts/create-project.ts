import dotenv from "dotenv";
import { load } from "cheerio";
import axios from "axios";
import { z } from "zod";
import OpenAI from "openai";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

async function scrapeWebpage(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = load(html);

    $("script").remove();
    $("style").remove();
    const text = $("body").toString();

    return text;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return "";
  }
}

// Get URL from command line arguments
const arg = process.argv[2];
const url = z.string().url().parse(arg);

const githubPage = await scrapeWebpage(url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const promptTemplate: string = readFileSync(
  join(__dirname, "create-project-prompt.txt"),
  "utf8"
);

// Combine prompt with scraped content
const prompt: string = `${promptTemplate}

HTML Content:
${githubPage}`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

try {
  const completion = await openai.chat.completions.create({
    model: "o3",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const generatedMdx = completion.choices[0].message.content;
  console.log(generatedMdx);
  // Remove ```mdx and ``` from start/end if present
  const cleanedMdx = generatedMdx
    ?.replace(/^```mdx\n/, "")
    .replace(/\n```$/, "")
    .trim();

  console.log("\nCleaned MDX output:");
  console.log(cleanedMdx);

  if (cleanedMdx == null) {
    console.error("No MDX content generated");
    process.exit(1);
  }

  const frontmatterMatch = cleanedMdx?.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.error("Could not find frontmatter in generated MDX");
    process.exit(1);
  }

  const frontmatter = frontmatterMatch[1];
  const slugMatch = frontmatter.match(/slug:\s*([^\n]+)/);
  const categoryMatch = frontmatter.match(/category:\s*([^\n]+)/);

  if (!slugMatch || !categoryMatch) {
    throw new Error("Could not find slug or category in frontmatter");
  }

  const slug = slugMatch[1].trim();
  const category = categoryMatch[1].trim();

  // Create directory if it doesn't exist
  const projectDir = join(process.cwd(), "projects", category.toLowerCase());
  mkdirSync(projectDir, { recursive: true });

  // Write the file
  const filePath = join(projectDir, `${slug}.mdx`);
  writeFileSync(filePath, cleanedMdx, "utf8");

  console.log(`\nMDX file written to: ${filePath}`);
} catch (error) {
  console.error("Error calling OpenAI API:", error);
  process.exit(1);
}
