import fs from "node:fs"
import { compileMDX } from "next-mdx-remote/rsc"
import { useMDXComponents } from "@/mdx-components"
import { notFound } from "next/navigation"

export const useCompile = async (file: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const components = useMDXComponents({})
  let source = ""
  try {
    source = fs.readFileSync(file, "utf8")
  } catch {
    notFound()
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
  })
  return {
    source,
    frontmatter: frontmatter as {
      category: string
      title: string
      posted?: string
      description: string
      image?: string
      audio?: string
      authors: { name: string; github: string; avatar: string }[]
    },
    ...content,
  }
}

export const useCompileFromSlug = (filePath: string) => {
  return useCompile(filePath)
}
