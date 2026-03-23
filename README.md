# Adwait Artha LLP

Official website for **Adwait Artha LLP** : Financial advisory and legal consulting in India. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Stack

| Area      | Choice                                         |
| --------- | ---------------------------------------------- |
| Framework | Next.js 16 · React 19 · TypeScript             |
| Styling   | Tailwind CSS 4 · shadcn/ui (Radix)             |
| Motion    | [Motion](https://motion.dev/)                  |
| Email     | Resend                                         |
| Security  | Arcjet (rate limiting / bot protection)        |
| Analytics | Vercel Analytics & Speed Insights (production) |

## Scripts

| Command                           | Purpose                |
| --------------------------------- | ---------------------- |
| `npm run dev`                     | Dev server (Turbopack) |
| `npm run build`                   | Production build       |
| `npm run start`                   | Run production server  |
| `npm run lint`                    | ESLint                 |
| `npm run format` / `format:check` | Prettier               |

## Setup

1. `npm install`
2. Copy `.env.example` → `.env.local` and set `APP_ENV`, `RESEND_API_KEY`, `ARCJET_KEY` as needed.
3. `npm run dev` → [http://localhost:3000](http://localhost:3000)

## Project layout

```
app/
  api/           # contact, schedule-consultation, arcjet
  components/    # pages sections, emails, ui/
  services/      # service routes + shared layout
  careers/
  layout.tsx, page.tsx, globals.css, sitemap.ts, error boundaries
lib/             # constants, env, arcjet, schema, utils
public/          # static assets, manifest, robots.txt
```

Content-heavy values live in `lib/constants.ts` (and related types). API routes validate with Zod (`lib/schema.ts`).

## Contributing

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for branches, PR flow, naming and commits.

## License

This project is proprietary and intended for Adwait Artha LLP.

---

For questions or support, contact [mit4s.dev@gmail.com](mailto:mit4s.dev@gmail.com)
