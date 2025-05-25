# OpenApps

> Discover, compare, and deploy open source alternatives to popular SaaS tools

OpenApps is a comprehensive directory of self-hostable open source projects that serve as alternatives to popular commercial software. Our mission is to help individuals and organizations find privacy-respecting, cost-effective solutions they can host themselves.

[![GitHub](https://img.shields.io/badge/GitHub-opendeploysh%2Fopenapps-blue?logo=github)](https://github.com/opendeploysh/openapps)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🌟 Features

- **📊 Comprehensive Directory**: 400+ curated open source projects across 40+ categories
- **🔍 Advanced Search & Filtering**: Find projects by category, difficulty, pricing model, and hosting type
- **⚖️ Side-by-Side Comparison**: Compare features, licenses, and deployment complexity
- **📈 GitHub Integration**: Real-time stars, forks, and activity data
- **🏷️ Smart Categorization**: Projects organized by use case and functionality
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🚀 Static Generation**: Fast loading with Next.js static site generation

## 🏗️ Architecture

OpenApps is built with modern web technologies:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Data**: MDX files for project content + JSON for metadata
- **Search**: Client-side fuzzy search with match-sorter
- **Deployment**: Static site generation for optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or later
- pnpm (recommended) or npm

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

## 📁 Project Structure

```
openapps/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── categories/         # Category pages
│   │   ├── compare/           # Project comparison
│   │   ├── projects/          # Individual project pages
│   │   └── ...
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utilities and data processing
│   └── mdx/                   # MDX rendering utilities
├── projects/                  # Project data (MDX files)
│   ├── analytics/
│   ├── automation/
│   ├── auth/
│   └── ...
├── scripts/                   # Build and data generation scripts
└── public/                    # Static assets
```

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
- ✅ Serve as alternatives to commercial software
- ✅ Are actively maintained
- ✅ Have proper documentation
- ✅ Include deployment instructions

## 🛠️ Technical Details

### Project Schema

Projects are validated using Zod schemas with these required fields:

- `slug` - Unique identifier
- `name` - Display name
- `description` - Project description
- `category` - Primary category
- `tags` - Array of relevant tags
- `github` - GitHub repository (owner/repo format)
- `deployment` - Difficulty and justification
- `alternatives` - Related projects

### Search & Filtering

- **Fuzzy Search**: Searches across names, descriptions, and alternatives
- **Category Filters**: Filter by project categories
- **Difficulty Filters**: Easy, Medium, Advanced deployment
- **Pricing Models**: Free, Open-Core, Freemium, Commercial
- **Hosting Types**: Self-Hosted, Cloud, Hybrid

## 🌐 Deployment

The site is optimized for static deployment:

1. **Build the site**:

   ```bash
   pnpm build
   ```

2. **Deploy the `out/` directory** to your preferred hosting platform:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages
   - Any static hosting service

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All the amazing open source projects featured in our directory
- Contributors who help maintain and improve the platform
- The open source community for inspiration and feedback

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/opendeploysh/openapps/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/opendeploysh/openapps/discussions)
- 🤝 **Contributing**: See our [Contributing Guidelines](#-contributing)

---

**Made with ❤️ by the OpenApps community**

_Discover. Compare. Deploy._
