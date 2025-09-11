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

## License

This project is proprietary and intended for Adwait Artha LLP.

---

For questions or support, contact [sandip@ssacs.in](mailto:sandip@ssacs.in) or [prashant@ssacs.in](mailto:prashant@ssacs.in)