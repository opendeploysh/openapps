import { Octokit } from "@octokit/rest"
import path from "path"
import fs from "fs"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const getAllProjectMdxFiles = () => {
  const contentDir = path.join(process.cwd(), "projects")

  const walkDir = (dir: string): string[] => {
    const files: string[] = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        files.push(...walkDir(fullPath))
      }
      if (item.endsWith(".mdx")) {
        files.push(fullPath)
      }
    }

    return files
  }

  return walkDir(contentDir)
}

/**
 * Gets the GitHub organization icon URL from the organization name
 */
async function getGithubOrgIcon(orgName: string): Promise<string | null> {
  try {
    const { data } = await octokit.orgs.get({
      org: orgName,
    })
    return data.avatar_url
  } catch (error) {
    console.error(`Error fetching GitHub org icon for ${orgName}:`, error)
    return null
  }
}
