# Adwait Artha LLP Website

Official website for **Adwait Artha LLP**, a leading financial advisory and legal consulting firm in India. Built with Next.js, TypeScript, and modern UI libraries.

## Features

- **Firm Overview:** Animated hero and about sections
- **Service Pages:** Detailed pages for IPO/SME IPO Advisory, Legal Drafting, Corporate Law, Loan Syndication, Financial Advisory, and Law Tribunals
- **Case Studies & Testimonials:** Client stories and feedback
- **Careers:** Open positions and team information
- **Contact & Scheduling:** Interactive contact section with consultation scheduling
- **Responsive Design:** Fully responsive with animated transitions
- **SEO & Accessibility:** Optimized for search engines and accessibility

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons
- [Sonner](https://sonner.emilkowal.ski/) for notifications
- [Resend](https://resend.com/) for email
- [Arcjet](https://arcjet.com/) for security

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run the development server:**

   ```sh
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
adwait/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   ├── arcjet/              # Arcjet security route
│   │   ├── contact/             # Contact form API
│   │   └── schedule-consultation/ # Consultation scheduling API
│   ├── careers/                 # Careers page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/              # React components
│   │   ├── ui/                 # Reusable UI components (shadcn/ui)
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ExpertiseSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── SchedulingModal.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── contact-email-template.tsx
│   │   └── email-template.tsx
│   ├── services/                # Service pages
│   │   ├── corporate-law/
│   │   ├── financial-advisory/
│   │   ├── ipo-sme-ipo-advisory/
│   │   ├── law-tribunals/
│   │   ├── legal-drafting-audit/
│   │   ├── loan-syndication/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── sitemap.ts               # Dynamic sitemap generation
├── lib/                         # Utility functions and configurations
│   ├── arcjet.ts               # Arcjet configuration
│   ├── constants.ts            # App constants
│   ├── constants.types.ts      # Type definitions for constants
│   ├── schema.ts               # Zod validation schemas
│   └── utils.ts                # Utility functions
├── public/                      # Static assets
│   ├── google1f0e4828e6972475.html  # Google verification
│   ├── hero.png
│   ├── logo-symbol-nobg.png
│   ├── logo-symbol.jpg
│   ├── logo.jpg
│   ├── manifest.json
│   ├── photo1.jpg
│   ├── photo2.jpeg
│   ├── photo3.jpg
│   └── robots.txt
├── .githooks/                   # Git hooks
│   └── pre-commit              # Pre-commit hook for branch validation
├── .vscode/                     # VS Code settings
│   └── settings.json
├── components.json              # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── .editorconfig                # Editor configuration
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier configuration
└── .prettierignore              # Prettier ignore rules
```

### Key Directories

- **`app/`**: Next.js App Router with pages, layouts, and API routes
- **`app/components/`**: React components including page sections and reusable UI components
- **`app/services/`**: Individual service pages with dedicated layouts
- **`app/api/`**: API routes for contact forms, scheduling, and security
- **`lib/`**: Shared utilities, constants, and validation schemas
- **`public/`**: Static assets like images, icons, and verification files

## Deployment

Deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Customization

- **Services:** Edit service details in `app/services/`
- **About/Team:** Update partner info in `app/components/AboutSection.tsx`
- **Careers:** Manage positions in `app/careers/page.tsx`
- **Contact:** Adjust contact info in `app/components/ContactSection.tsx`
- **Constants:** Update site-wide constants in `lib/constants.ts`

## Contributing

### Branch Workflow

All changes must follow this workflow:

```
feature-branch → development → staging → main
```

1. Create a feature/fix branch from `development`
2. Raise a PR to merge into `development`
3. After approval, raise a PR from `development` to `staging`
4. After testing, raise a PR from `staging` to `main`

**Branch purposes:**
- `development` - Integration branch for ongoing development
- `staging` - Pre-production environment for testing
- `main` - Production-ready code

> **Important:** Never raise PRs directly to `main` or `staging`.

### Branch Naming

Branch names must follow this pattern: `^(feature|bugfix|update|release)/[a-z0-9._-]+$`

| Type | Prefix | Example |
|------|--------|---------|
| New feature | `feature/` | `feature/add-testimonials-carousel` |
| Bug fix | `bugfix/` | `bugfix/contact-form-validation` |
| Update/Enhancement | `update/` | `update/footer-links` |
| Release | `release/` | `release/v1.2.0` |

### Commit Messages

Follow conventional commits format:

```
<type>: <short description>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `test`

## License

This project is proprietary and intended for Adwait Artha LLP.

---

For questions or support, contact [mit4s.dev@gmail.com](mailto:mit4s.dev@gmail.com)
