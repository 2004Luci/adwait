# Adwait Artha LLP Website

This is the official website for **Adwait Artha LLP**, a leading financial advisory and legal consulting firm in India. The site is built with [Next.js](https://nextjs.org), TypeScript, and modern UI libraries, providing a professional, interactive, and informative experience for clients and prospective team members.

## Features

- **Firm Overview:** Animated hero and about sections introducing Adwait Artha LLP, its mission, vision, and partners.
- **Service Pages:** Detailed pages for each service area:
  - IPO/SME IPO Advisory
  - Legal Drafting, Audit & Assurance
  - Corporate Law/Secretarial Services
  - Loan Syndication, Restructuring & Project Finance
  - Financial Statement Advisory/Structuring/Restructuring
  - Appearance Before Law Tribunals/Forums
- **Case Studies & Testimonials:** Real client stories and feedback highlighting the firm's expertise and results.
- **Careers:** Open positions, benefits, and a call to talented professionals to join the team.
- **Contact & Scheduling:** Interactive contact section and scheduling modal for consultations.
- **Responsive Design:** Fully responsive, with animated transitions and modern UI/UX.
- **SEO & Accessibility:** Semantic HTML, optimized fonts, and accessible components.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) (customized with sage/cream color palette)
- [Vercel Fonts](https://vercel.com/font) (Geist)
- [Sonner](https://sonner.emilkowal.ski/) for notifications

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

2. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

- `app/` – Main Next.js app directory (pages, components, services, API routes)
- `lib/` – Utility functions
- `public/` – Static assets (images, icons)
- `components.json`, `postcss.config.mjs`, `tsconfig.json` – Project configuration files

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Customization

- **Services:** Edit or add service details in `app/services/`.
- **Team/About:** Update partner and about info in [`app/components/AboutSection.tsx`](app/components/AboutSection.tsx).
- **Careers:** Manage open positions in [`app/careers/page.tsx`](app/careers/page.tsx).
- **Contact:** Adjust contact info and scheduling logic in [`app/components/ContactSection.tsx`](app/components/ContactSection.tsx).

## Contributing Guidelines

We welcome contributions! Please follow these guidelines to maintain a clean and organized codebase.

### Branch Workflow

All changes must follow this branch workflow:

1. **Create a feature/fix branch** from `development`
2. **Raise a PR** to merge into `development`
3. Once approved and merged, raise a PR from `development` to `staging` (pre-production)
4. After testing in staging, raise a PR from `staging` to `main` (production)

```
feature-branch → development → staging → main
```

**Branch purposes:**
- `development` - Integration branch for ongoing development
- `staging` - Pre-production environment for final testing
- `main` - Production-ready code

> **Important:** Never raise PRs directly to `main` or `staging`. All PRs must follow the workflow: `development` → `staging` → `main`.

### Branch Naming Conventions

Branch names are enforced by a pre-commit hook and must follow this pattern:

```
^(feature|bugfix|update|release)/[a-z0-9._-]+$
```

Use the following prefixes for your branch names:

| Type | Prefix | Example |
|------|--------|---------|
| New feature | `feature/` | `feature/add-testimonials-carousel` |
| Bug fix | `bugfix/` | `bugfix/contact-form-validation` |
| Update/Enhancement | `update/` | `update/footer-links` |
| Release | `release/` | `release/v1.2.0` |

**Format:** `<type>/<short-description>`

- Use **lowercase letters only**
- Use hyphens (`-`), underscores (`_`), or dots (`.`) to separate words
- Numbers are allowed (0-9)
- Keep descriptions short but descriptive

> **Note:** Direct commits to `development`, `staging`, and `main` are not allowed. Always create a feature branch and raise a PR.

### Pull Request Guidelines

1. **Title:** Use a clear, descriptive title summarizing the change
   - Example: `feat: add testimonials carousel component`
   - Example: `fix: resolve contact form validation error`

2. **Description:** Include:
   - What changes were made
   - Why the changes were made
   - Any relevant issue numbers (e.g., `Closes #123`)
   - Screenshots (if UI changes)

3. **Checklist before submitting:**
   - [ ] Code follows the project's coding standards
   - [ ] All tests pass (if applicable)
   - [ ] No linting errors
   - [ ] PR targets the correct branch (`development` for feature branches)
   - [ ] Commit messages are clear and descriptive

4. **Review Process:**
   - At least one approval is required before merging
   - Address all review comments before merging
   - Squash commits if necessary to keep history clean

### Commit Message Convention

Follow the conventional commits format:

```
<type>: <short description>

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `chore`: Maintenance tasks
- `test`: Adding or updating tests

## License

This project is proprietary and intended for Adwait Artha LLP.

---

For questions or support, contact [mit4s.dev@gmail.com](mailto:mit4s.dev@gmail.com)
