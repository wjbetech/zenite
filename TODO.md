# Zenite — Actionable TODO

This file replaces the old list with a prioritized, code-aware task list and small implementation notes. Mark items done as you complete them and add PR links where appropriate.

PRIORITY: High (must-have for MVP)

- [ ] Task persistence: ensure GET / POST / PUT / DELETE endpoints work end-to-end with Prisma and Clerk auth

  - Files: `app/api/tasks/route.ts`, `app/api/tasks/[id]/route.ts`, `app/components/Modals/TaskModal.tsx`, `app/components/TasksGroup/Tasks.tsx`
  - Notes: API already exists — verify user auth, validate request/response shapes, add error handling and tests.

- [ ] Modal + quick-capture flow: make Add Task modal toggle solid, wire quick input + inline parsing for basic times

  - Files: `app/components/Modals/AddTaskModal.tsx`, `app/components/Modals/TaskModal.tsx`, `app/components/TasksGroup/Tasks.tsx`
  - Notes: keep parser conservative ("tomorrow 6pm", "in 30m"). Show parsed preview before submit.

- [ ] Toast/feedback on create/update/delete actions (react-hot-toast)

  - Files: `app/components/Modals/TaskModal.tsx`, global layout or provider to include Toaster
  - Notes: consistent success/error toasts; ensure toasts are accessible and dismissible.

- [ ] Update Task model for scheduling (startAt, endAt, notifyStart, notifyEnd)
  - Files: `prisma/schema.prisma` (+ migration), `app/api/tasks/*.ts` and types used in frontend
  - Notes: prepare a migration plan; if using MongoDB, consider migration script or optional fields.

PRIORITY: Medium (important for user experience)

- [ ] In-page notifications & simple desktop notifications (Notification API)

  - Files: new `components/notifications/*` + integrate with task scheduler and IndexedDB persistence
  - Notes: implement permission flow UI and in-app fallback if denied.

- [ ] Calendar / Agenda view for Today (visualize scheduled tasks)

  - Files: new `app/components/Calendar/DayView.tsx`, wire into `app/page.tsx` or dashboard
  - Notes: simple list grouped by hour is fine for MVP.

- [ ] Auth & Profile: verify Clerk wiring and add a minimal User Profile page

  - Files: `app/sign-in/*`, `app/sign-up/*`, `app/settings/page.tsx` (or `app/profile/page.tsx`)
  - Notes: expose basic profile fields and preference for Local-only mode.

- [ ] Theming + styling consolidation: adopt shadcn + Tailwind and remove conflicting styling patterns
  - Files: global styles, component styles; migrate key components first (modals, buttons, inputs)
  - Notes: avoid mixing styled-components and Tailwind in the same component; add design tokens to `tailwind.config.js`.

PRIORITY: Low (nice-to-have / future)

- [ ] Offline sync & IndexedDB queue for scheduled reminders
- [ ] PWA & service worker for background notifications (longer-term)
- [ ] Recurring tasks, templates, and habit-mode features
- [ ] Integrations: Google Calendar import / one-way suggestions
- [ ] Export / import JSON for portability

TESTING & CI

- [ ] Add 5 E2E tests (create, edit, complete, delete, auth) — use Playwright or Cypress
- [ ] Add an a11y smoke test and run on CI for main pages

DOCS & DEV EXPERIENCE

- [ ] `README.md` updated with local dev steps (prisma generate, DATABASE_URL, Clerk env vars)
- [ ] `CONTRIBUTING.md` with commit conventions and PR guidelines

Safety plan for Node package updates

1. Inspect current tree and outdated packages:

```bash
npm outdated --long
```

2. Create a branch and run a conservative dependency upgrade tool (safe approach):

```bash
git checkout -b chore/update-deps
npx npm-check-updates -u    # updates package.json versions
npm install
```

3. Fix breaking changes one-at-a-time (especially Next, React, Clerk, Prisma):

   - Read release notes for major bumps.
   - Run `npm run dev` and run the app locally, fix type errors.

4. Run tests and lint, and push a PR for code review.

Notes and recommendations

- Pin major runtime deps that affect behavior (Next, React, Prisma, Clerk) behind small, reviewed PRs.
- Upgrade dev dependencies in a single PR where possible.
- If upgrading Next.js or Prisma, ensure to check migration guides for DB schema and Next config changes.
- Consider using `node` LTS supported by the updated Next version; update `.nvmrc` or `engines` if desired.

If you'd like, I can:

- run a full repo scan for outdated packages and prepare a draft `chore/update-deps` branch with updated package.json (I will not run installations that modify your environment unless you confirm), or
- implement a small, safe POC (Quick-capture component) from the sprint checklist.
