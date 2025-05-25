import fs from "node:fs";
import path from "node:path";
import openai from "openai";

import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";

dotenv.config();

interface PageData {
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
}

async function scrapeWebPage(url: string): Promise<PageData> {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // Extract basic metadata
  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text() ||
    $("h1").first().text();

  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content") ||
    "";

  // Try to find GitHub URL
  const githubUrl = $('a[href*="github.com"]').attr("href");

  return {
    title: title.trim(),
    description: description.trim(),
    url,
    githubUrl,
  };
}

async function generateMdx(pageData: PageData) {
  const slug = pageData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const outputPath = path.join(
    process.cwd(),
    "projects",
    "wikis",
    `${slug}.mdx`
  );

  // Skip if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${pageData.title} - file already exists`);
    return;
  }

  const client = new openai({ apiKey: process.env.OPEN_API_KEY });

  const prompt = `Create an MDX file for this project in the same format as Wiki.js documentation:

Name: ${pageData.title}
Description: ${pageData.description}
Website URL: ${pageData.url}
${pageData.githubUrl ? `GitHub URL: ${pageData.githubUrl}` : ""}

The MDX should include:
- Frontmatter with metadata (slug, name, description, tags, etc)
- Key features section
- Who should use this section
- Getting started section
- Make it detailed but factual
- Follow the exact same structure as Wiki.js documentation

Base it on this URL content: ${pageData.url}`;

  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const mdxContent = response.choices[0].message.content;

  if (!mdxContent) {
    throw new Error("Failed to generate MDX content");
  }

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, mdxContent);
  console.log(`Generated MDX file for ${pageData.title}`);
}

async function main() {
  if (process.argv.length < 3) {
    console.error("Please provide a URL to scrape");
    process.exit(1);
  }

  const url = process.argv[2];

  try {
    const pageData = await scrapeWebPage(url);
    await generateMdx(pageData);
  } catch (error) {
    console.error("Failed to generate MDX:", error);
  }
}

main().catch(console.error);
