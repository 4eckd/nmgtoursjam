<p align="center">
  <img src="./public/favicon.png" alt="NMG Tours JAM Logo" width="120" height="120" />
</p>

<h1 align="center">🌴 NMG Tours JAM 🌊</h1>

<p align="center">
  <strong>Explore. Experience. Remember.</strong><br/>
  <a href="https://nmgtoursjam.com" target="_blank">nmgtoursjam.com</a>
</p>

<p align="center">
  <a href="https://github.com/4eckd/nmgtoursjam/actions/workflows/version-tag.yml"><img src="https://github.com/4eckd/nmgtoursjam/actions/workflows/version-tag.yml/badge.svg" alt="Version Tagging and Release"></a>
  <a href="https://nmgtoursjam.com/"><img src="https://img.shields.io/github/deployments/4eckd/nmgtoursjam/Production?label=Deployment&logo=vercel&logoColor=white" alt="Deployment Status"></a>
  <a href="https://github.com/4eckd/nmgtoursjam/commits/main"><img src="https://img.shields.io/github/last-commit/4eckd/nmgtoursjam?logo=git&label=Last%20Commit" alt="Last Commit"></a>
  <a href="https://github.com/4eckd/nmgtoursjam/stargazers"><img src="https://img.shields.io/github/stars/4eckd/nmgtoursjam?style=social" alt="Stars"></a>
  <a href="https://hits.sh/github.com/4eckd/nmgtoursjam/"><img src="https://hits.sh/github.com/4eckd/nmgtoursjam.svg?label=Views&color=blue" alt="Hits"></a>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Built%20with-Next.js-000?logo=nextdotjs" alt="Built with Next.js"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white" alt="Styled with TailwindCSS"></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel" alt="Deployed with Vercel"></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/Package%20Manager-pnpm-F69220?logo=pnpm" alt="Maintained with pnpm"></a>
  <a href="https://github.com/4eckd/nmgtoursjam/blob/main/LICENSE"><img src="https://img.shields.io/github/license/4eckd/nmgtoursjam" alt="License"></a>
</p>

---

## 🌍 About

Welcome to **NMG Tours JAM**, your gateway to unforgettable Jamaican adventures.
This repository powers [nmgtoursjam.com](https://nmgtoursjam.com/) — a modern, high-performance web app that connects travelers with authentic local experiences.

**Current Status**: MVP Development (68% Complete) | **Version**: 1.0.0 | **Branch**: `integration/mvp-launch`

> 📋 **Quick Links**: [MVP Milestones](docs/planning/MILESTONES.md) | [Documentation](docs/README.md) | [Development Guide](CLAUDE.md) | [Database Setup](DATABASE_SETUP.md)

---

## 🎯 MVP Progress

```
TRACK 1 - Marketing & Content:     ███████████████░░░░░░░░░  62.5% 🚧
TRACK 2 - Database Infrastructure: ████████████████████████ 100% ✅
TRACK 3 - Tours System:            ████████████████░░░░░░░░  80% 🚧
TRACK 4 - Authentication:          ████████████░░░░░░░░░░░░  60% 🚧
TRACK 5 - Booking & Payments:      ░░░░░░░░░░░░░░░░░░░░░░░░   0% ⏳

Overall MVP Progress:              ████████████████░░░░░░░░  70.5%
```

**Recently Completed** ✅:
- ✅ **Enhanced Hero Section** (M1.1) - Modern two-column design with animated gradients
- ✅ Database abstraction layer with static data fallback
- ✅ Prisma schema (10 models: Users, Tours, Bookings, Reviews, etc.)
- ✅ API routes with database integration (tours, categories)
- ✅ Server Component optimization (tours pages)
- ✅ Version tagging workflow & automated releases
- ✅ CI/CD pipeline (8 GitHub Actions workflows)

**In Progress** 🚧:
- 🚧 Tours search & advanced filters
- 🚧 User authentication flows
- 🚧 Marketing content (hero, gallery, about)

**Up Next** ⏳:
- ⏳ User dashboard & profile management
- ⏳ Multi-step booking wizard
- ⏳ Stripe payment integration

---

## 🚀 Purpose

- Present the full range of NMG's curated tours and travel packages.
- Provide a smooth, mobile-first booking experience.
- Keep performance optimized with fast-loading images and lean code.
- Maintain a content-flexible structure so admins can easily update tours or pricing.  

---

## 📁 Project Structure  

```plaintext
nmgtoursjam/
│
├── src/              # Next.js pages, components, and utilities
├── public/           # Static assets (favicon, banner, images)
├── content/          # Tour and location metadata
├── styles/           # TailwindCSS configuration
├── package.json
└── CLAUDE.md         # AI assistant and dev context guide
````

---

## 🧑‍💻 Getting Started

```bash
# Clone the repository
git clone https://github.com/4eckd/nmgtoursjam.git

# Navigate into the project
cd nmgtoursjam

# Install dependencies
pnpm install

# Run local development server
pnpm dev
```

Then visit [http://localhost:3000](http://localhost:3000) to preview.

---

## 🛠️ Technology Stack

| Category            | Tools / Frameworks                                                       |
| :------------------ | :----------------------------------------------------------------------- |
| **Framework**       | [Next.js](https://nextjs.org/), [React](https://react.dev/)              |
| **Styling**         | [TailwindCSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/) |
| **Deployment**      | [Vercel](https://vercel.com/)                                            |
| **Package Manager** | [pnpm](https://pnpm.io/)                                                 |
| **Version Control** | [GitHub](https://github.com/)                                            |
| **AI Reference**    | [`CLAUDE.md`](https://github.com/4eckd/nmgtoursjam/blob/main/CLAUDE.md)  |

---

## 🧭 Contributing

1. Create a new feature branch:

   ```bash
   git checkout -b feat/new-tour
   ```
2. Commit with clear messages:

   ```bash
   git commit -m "feat(tour): add Mystic Falls rainforest ziplines"
   ```
3. Push your branch and open a pull request.
4. Tag `@4eckd` for any core feature or design changes.

---

## 📸 Content Team Notes

* Add new tours in `/content` with image references and descriptions.
* Optimize all images before committing (use `.webp` or `.avif`).
* Include descriptive alt text for accessibility.
* Run `pnpm lint` before pushing to keep formatting consistent.

---

## 📈 Deployment

This site is automatically deployed to **Vercel** whenever changes are pushed to the `main` branch.
You can view build logs and deployments in the [Vercel Dashboard](https://vercel.com/dashboard).

---

## 📊 Metrics & Analytics

* **Page Views:** via [Hits.sh](https://hits.sh) badge above
* **GitHub Stars / Commits:** via Shields.io
* **Deployment Health:** through GitHub Deployments API

---

## 📚 Knowledge Base  
For in-depth guides, workflow notes, and team documentation, visit the  
👉 [NMG Tours JAM Knowledge Base](https://github.com/4eckd/nmgtoursjam/tree/main/docs)

---

## 📞 Support

For help or questions:

* Open an issue on GitHub
* Email: **[support@nmgtoursjam.com](mailto:support@nmgtoursjam.com)**
* Tag `@4eckd` for urgent deployment assistance

---

### ✨ “Let’s build memories that last a lifetime.”

> *NMG Tours JAM – Where every journey tells a story.*

---
