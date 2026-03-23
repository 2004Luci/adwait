# Contributing

Internal guidelines for this repository.

## Branch flow

```
feature-branch → development → staging → main
```

1. Branch from **`development`** for features and fixes.
2. Open a PR into **`development`**.
3. After review, promote **`development` → `staging`** for pre-production checks.
4. Promote **`staging` → `main`** for production.

Do **not** open PRs directly to `main` or `staging` unless agreed for hotfixes.

## Branch naming

Pattern: `^(feature|bugfix|update|release)/[a-z0-9._-]+$`

| Prefix     | Use                                           |
| ---------- | --------------------------------------------- |
| `feature/` | New functionality                             |
| `bugfix/`  | Bug fixes                                     |
| `update/`  | Improvements / refactors without new features |
| `release/` | Release prep                                  |

Examples: `feature/contact-form-honeypot`, `bugfix/schedule-modal-timezone`.

## Commits

Prefer [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `test`.

## Code quality

- Run `npm run lint` before pushing.
- Use `npm run format` (or your editor’s Prettier) for formatting.

## Questions

Coordinate with the project maintainer for access, secrets and deployment.
