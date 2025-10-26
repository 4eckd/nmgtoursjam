# Contributing to NMGToursJam

Thank you for your interest in contributing to NMGToursJam! This guide will help you get started.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/nmgtoursjam.git`
3. Add upstream remote: `git remote add upstream https://github.com/4eckd/nmgtoursjam.git`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## 🔧 Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Set up database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

## 📋 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Enable strict mode
- Define types for all function parameters and return values
- Use interfaces for object shapes

### React Components
- Use functional components with hooks
- Follow the component structure in existing code
- Place components in appropriate directories
- Write unit tests for new components

### Styling
- Use Tailwind CSS utilities
- Follow the custom color scheme (nm-*)
- Keep responsive design in mind
- Test on mobile devices

### Git Commits
Follow conventional commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or auxiliary tool changes

Example: `feat: add tour search filtering`

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run E2E tests
npm run test:e2e
```

### Writing Tests
- Write unit tests for utility functions
- Write integration tests for API routes
- Write E2E tests for critical user flows
- Aim for >80% code coverage

## 📝 Pull Request Process

1. **Before submitting:**
   - Update documentation if needed
   - Add tests for new functionality
   - Run `npm run lint` and fix issues
   - Run `npm test` and ensure all pass
   - Update CHANGELOG.md if applicable

2. **PR Description should include:**
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Screenshots for UI changes

3. **PR Title Format:**
   - Follow conventional commits format
   - Be clear and descriptive
   - Reference issue number if applicable

## 🏗️ Project Structure

```
nmgtoursjam/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth-related pages
│   ├── (marketing)/       # Public pages
│   ├── (app)/            # Protected app pages
│   └── api/              # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   └── layouts/          # Layout components
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## 🐛 Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, etc)

## 💬 Getting Help

- Check existing issues and PRs
- Read the documentation thoroughly
- Ask in GitHub Discussions
- Contact maintainers if needed

## 🎯 Areas for Contribution

### High Priority
- Mobile responsiveness improvements
- Performance optimizations
- Accessibility enhancements
- Test coverage increase
- Documentation updates

### Feature Ideas
- Multi-language support
- Social media integration
- Advanced search filters
- Offline functionality
- Admin analytics dashboard

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to NMGToursJam! 🎉