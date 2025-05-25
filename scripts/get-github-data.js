import { Octokit } from "@octokit/rest";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read projects data from JSON file
const projectsPath = path.join(__dirname, "../src/lib/projects.json");
const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getGitHubData() {
  const projectsWithData = [];
  for (const project of projects) {
    if (!project.github) continue;

    const [owner, repo] = project.github.split("/");
    console.log("processing", project.name, project.github);

    try {
      // Get repository data
      const { data: repoData } = await octokit.repos.get({
        owner,
        repo,
      });

      // Get latest commit data
      const { data: commits } = await octokit.repos.listCommits({
        owner,
        repo,
        per_page: 1,
      });

      // Get repository languages data
      const { data: languages } = await octokit.repos.listLanguages({
        owner,
        repo,
      });

      const projectData = {
        slug: project.slug,
        ...repoData,
        lastCommitDate: commits[0]?.commit?.author?.date
          ? new Date(commits[0].commit.author.date)
          : null,
        languages,
      };

      projectsWithData.push(projectData);

      // GitHub API has rate limits, so add a small delay
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error fetching data for ${project.name}:`, error.message);
    }
  }

  return projectsWithData;
}

const data = Object.fromEntries(
  (await getGitHubData()).map((project) => [project.slug, project])
);

fs.writeFileSync(
  path.join(__dirname, "../src/lib/projects-github.json"),
  JSON.stringify(data, null, 2)
);

console.log("GitHub data fetched and saved successfully");
