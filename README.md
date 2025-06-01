# OpenApps

> Discover, compare, and deploy selfhosted solutions

OpenApps was created to solve the challenge of finding and evaluating open
source software. While other directories exist, they often lack searchability,
detailed comparisons, and comprehensive project information. Our goal is to be
the definitive, community-driven source of truth for open source projects.

All project data is stored transparently in the `projects/` directory as
markdown files that anyone can view, edit, and improve. We aim to provide rich
information about each project's features, deployment requirements, and
real-world usage to help users make informed decisions.

What sets OpenApps apart:

- License badges that clearly show how each project's license impacts users (if
  the software is truly FOSS)
- Popularity scores based on commit activity, stars, forks and other metrics to
  surface active, well-maintained projects
- Detailed deployment information and complexity ratings
- Side-by-side feature comparisons across alternatives
- A opensource and single source for discovering, evaluating and deploying open
  source solutions

[![GitHub](https://img.shields.io/badge/GitHub-opendeploysh%2Fopenapps-blue?logo=github)](https://github.com/opendeploysh/openapps)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🏗️ Architecture

OpenApps is built with modern web technologies:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Data**: MDX files for project content + JSON for metadata
- **Search**: Client-side fuzzy search with match-sorter
- **Deployment**: Static site generation for optimal performance

## Development

### Prerequisites

- Node.js 22.x or later
- pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/opendeploysh/openapps.git
   cd openapps
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Generate project data**

   ```bash
   pnpm generate
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm generate` - Generate project data from MDX files
- `pnpm get-github-data` - Fetch latest GitHub statistics
- `pnpm lint` - Run ESLint

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding a New Project

1. **Create an MDX file** in the appropriate category folder:

   ```bash
   projects/[category]/[project-slug].mdx
   ```

2. **Use this template**:

   ```yaml
   ---
   slug: project-name
   name: Project Name
   description: |
     Brief description of what the project does and its main purpose.
   logo: https://example.com/logo.png
   category: analytics
   tags: [analytics, monitoring, privacy]
   github: owner/repository
   urls:
     website: https://example.com
   alternatives:
     selfHosted: [similar-project-1, similar-project-2]
     nonSelfHosted: [commercial-alternative-1, commercial-alternative-2]
   deployment:
     difficulty: "Easy"
     justification: "Simple Docker deployment with minimal configuration."
   pricingModel: Free
   hostingType: Self-Hosted
   ---
   # Project content in Markdown
   ```

3. **Add project content** describing features, use cases, and setup instructions

4. **Test your changes**:
   ```bash
   pnpm generate
   pnpm dev
   ```

### Improving Existing Content

- Fix typos or outdated information
- Add missing project details
- Improve project descriptions
- Update deployment instructions

### Development Guidelines

- Follow TypeScript best practices
- Use functional React components
- Maintain responsive design
- Add proper error handling
- Write descriptive commit messages

## 📊 Data Sources

- **Project Metadata**: Curated MDX files in `/projects`
- **GitHub Data**: Automatically fetched via GitHub API
- **Categories**: Defined in `/src/lib/categories.ts`
- **Icons**: Lucide React icons + project logos

## 🔄 Automated Updates

GitHub Actions automatically:

- Updates GitHub statistics every 8 hours
- Regenerates project data
- Commits changes back to the repository

## 📝 Content Guidelines

When adding projects, ensure they:

- ✅ Are open source with clear licensing
- ✅ Can be self-hosted
- ✅ Are actively maintained
- ✅ Have proper documentation
- ✅ Include deployment instructions

## 🛠️ Technical Details

### Search & Filtering

- **Fuzzy Search**: Searches across names, descriptions, and alternatives
- **Category Filters**: Filter by project categories
- **Difficulty Filters**: Easy, Medium, Advanced deployment
- **Pricing Models**: Free, Open-Core, Open-Core, Commercial
- **Hosting Types**: Self-Hosted, Cloud, Hybrid

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All the amazing open source projects featured in our directory
- Contributors who help maintain and improve the platform
- The open source community for inspiration and feedback

---

**Made with ❤️ by the OpenApps community**

_Discover. Compare. Deploy._
