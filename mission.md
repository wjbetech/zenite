# Zenite — Mission & Roadmap

This document describes Zenite's refined mission and product vision, focusing the app on simple daily goals, healthy habits, and gentle reminders — not on squeezing every second for maximum output.

High-level plan (what I'll do next)

- Read this file and your notes, fold the product vision into the mission (done).
- Add a clear product principles section that drives design and engineering decisions.
- Add a feature blueprint for calendar/notifications, habit support, and UI guidance (shadcn + light theme).

## Vision & unique value proposition

Zenite helps a user set a few small, meaningful daily goals quickly, then gently reminds them to start and finish those tasks using contextual calendar cues and desktop notifications. The aim is to increase consistent, healthy progress — not relentless optimization.

Why this matters

- Many productivity apps try to optimize every minute, which leads to burnout and friction.
- Users want a lightweight way to capture daily commitments, schedule them, and receive kind nudges to begin and end work.
- Zenite's differentiator: ultra-quick goal creation, a calming minimal UI, and a calendar-driven reminder system that supports healthy routines.

## Pain points we solve

- Overwhelming feature bloat: remove rarely-used features; surface only what matters for daily goals.
- Hard to translate goals to time: provide simple start/finish scheduling tied to calendar slots.
- Notifications that annoy: use configurable, gentle reminders with snooze and clear dismiss actions.
- Unsustainable productivity pressure: encourage realistic time-boxing and habit streaks, not over-optimization.

Product principles (guiding decisions)

- Minimal by default: minimal screens, minimal inputs, immediate feedback.
- Human-first reminders: notifications are supportive, configurable, and respect focus/Do Not Disturb windows.
- Small wins: encourage 3–5 daily goals, celebrate completion, and avoid punishment for missed items.
- Consistent theme: use shadcn component primitives with a clean light theme; avoid mixing many styling systems.

UI & Styling guidance

- Primary: adopt shadcn/ui (Radix + Tailwind utility patterns) as the base component system for accessibility and consistency.
- Theme: ship a single, consistent light theme for MVP with careful spacing, generous type, and neutral colors. Optionally add a gentle dark theme later.
- Tailwind: keep utility classes controlled; prefer design tokens/variants via Tailwind config.
- Note: `daisyUI` can be helpful for pre-built themes, but mixing shadcn + daisyUI may produce conflicts. Prefer shadcn for components and consider extracting color palettes from daisyUI if needed.

Feature blueprint — Calendar & Notifications

Goal: let users assign a start and end time to a task and receive desktop notifications when it's time to start and when the allotted time is ending.

Contract (2–3 bullets):

- Input: task object with { id, title, startAt?: ISOString, endAt?: ISOString, userId, notifyStart?: boolean, notifyEnd?: boolean }
- Output: desktop notification shown at startAt and optionally at endAt; notification payload links to task-view.
- Error modes: missing permission (no notifications), overlapping events (warn but allow), offline (queue for next online window).

Edge cases to handle

- User denies notification permissions: show in-app badge and fallback to email/push if configured.
- Timezone differences between server and client: store times in ISO + timezone or in user's local time and normalize.
- Conflicting reminders: allow quick reschedule or snooze.

High-level implementation notes

- Use the Notification API + service worker for background notifications (for PWA) or server-side push for cross-device.
- For desktop notifications while the app is open, use the browser Notification API directly.
- Persist scheduled reminders locally (IndexedDB) so they survive reloads; sync scheduled reminders with server for multi-device consistency.

Healthy-habits features (product-level)

- Suggested daily goal count (3 default) with soft limits to avoid overcommitment.
- Habit streaks and gentle celebration (no punitive streak resets; instead show recovery options).
- Pomodoro-like optional mode with soft breaks and suggested focus windows.

Metrics & success signals (behavioral)

- % of users who schedule at least one timed task per day (engagement)
- Weekly retention for users who adopted scheduled reminders (habit formation)
- % of reminders acted upon (started within ±10 minutes)

Roadmap (prioritized)

MVP (2 weeks)

- Quick capture UI for daily goals (title + optional start/end time).
- Basic calendar view showing today's scheduled items.
- Desktop start/end notifications while app is open. Fallback: in-app alerts.
- Ensure core CRUD (create/edit/delete) for tasks is reliable and synced to DB.

Post-MVP (3–8 weeks)

- Background notifications (service worker / server push) for cross-device reminders.
- Offline scheduling and sync with conflict resolution.
- Theming polish and shadcn componentization across key screens.
- Basic analytics and E2E tests for core flows.

Long-term (3+ months)

- Full PWA support and cross-device push notifications.
- Smart suggestions for scheduling (based on past behavior and calendar availability).
- Integrations (Google Calendar, iCal) — optional and gated behind permissions.

Immediate next steps (concrete)

1. Replace/Add a minimal Task schema fields for scheduling in Prisma (startAt, endAt, notifyStart, notifyEnd) and migrate or adapt existing model. (Owner: Dev)
2. Implement quick-capture UI: single input flow that returns a new task and optional time-pickers. (Owner: Frontend)
3. Add in-page start/end notifications using the Notification API (request permission flow, graceful fallback). (Owner: Frontend)
4. Add 'daily goals' UX: suggested goal count, onboarding state, and small celebration on completion. (Owner: Product/Frontend)
5. Audit styling libraries and choose primary stack (shadcn + Tailwind). Remove or isolate conflicting styling systems. (Owner: Frontend)

Prioritized checklist (this sprint)

- [ ] Add scheduling fields to Task model and ensure API supports them
- [ ] Quick-capture UI for daily goals (title + optional start/end)
- [ ] In-page notifications for start and end times
- [ ] Calendar view for today with scheduled items
- [ ] Limit suggested daily goals to 3 and add soft celebration UX
- [ ] Choose and lock styling approach (shadcn + light theme)

Risks & mitigations (updated)

- Risk: Notification permissions low/absent. Mitigation: clear permission UX and fallback in-app reminders.
- Risk: Styling conflicts between shadcn and existing libraries. Mitigation: isolate shadcn components and migrate incrementally.

Closing

This file is the living product north star for Zenite. If you want, I can now:

- Open issues for each prioritized checklist item and create branch stubs.
- Generate a minimal Prisma migration for scheduling fields (I can prepare the change but not run migrations here).
- Wire a small POC component that requests Notification permission and fires a test notification.

Tell me which of those three you'd like me to do next.

Project Standards:

# ✨ Zenite Mission Statement

Zenite exists to help people build a healthier relationship with productivity.

Instead of pushing for relentless optimization, Zenite encourages users to set a few small, meaningful goals each day — then supports those goals with gentle reminders, a calming interface, and simple scheduling tools that respect real human rhythms.

Our mission is to create a focused, minimalistic productivity companion that:

- Prioritizes clarity over complexity
- Encourages consistency over intensity
- Supports healthy routines without pressure or punishment

Zenite is built for people who want to stay grounded, make intentional progress, and avoid burnout — all while using a beautiful, distraction-free app that fits effortlessly into their day.

We believe productivity should feel calm, not chaotic.

Zenite helps users:

- Quickly capture 3–5 daily goals
- Assign time windows with ease
- Receive kind, configurable reminders to start and finish
- Celebrate small wins and let go of guilt when things shift

Zenite is not about maximizing every minute — it's about making the minutes you choose to spend feel meaningful and manageable.

---

## 🧑‍💻 Engineering Ethos

Zenite’s engineering principles mirror its product values: clarity, consistency, and minimalism. We write code that is clean, maintainable, and kind to future developers.

### Core Practices

- **Type Safety First**: Use TypeScript strictly. Avoid `any` — always prefer precise or inferred types.
- **Minimal Dependencies**: Stick to the minimal set of dependencies needed. Favor standard patterns and composability over cleverness.
- **Consistent Styling**: Use `shadcn/ui` and `Tailwind` exclusively. No mixing with other component or styling libraries.
- **Accessible by Default**: All UI components should meet WCAG standards using Radix primitives.
- **Offline-Ready**: Design APIs and state with sync/latency in mind (PWA-first mindset).
- **No Feature Bloat**: Remove unused code, components, or ideas ruthlessly. We build only what supports the user journey.
- **Clear Commit History**: Write meaningful commits, use conventional commits (`feat:`, `fix:`, `refactor:`), and squash before merge.
- **Tests That Matter**: Focus on end-to-end and critical logic tests. Avoid over-testing implementation details.

> Code should be as peaceful and intentional as the product itself.

---

This mission guides every decision — from interface tone and reminder timing, to naming conventions and build pipelines.

**Productivity is personal. Zenite is here to make it peaceful — for users and for developers.**

## Additions & suggestions (extras that keep K.I.S.S.)

Below are small, high-value ideas that build on the mission and engineering standards while preserving the minimal, gentle UX.

- Privacy-first toggle: add a single-profile setting "Local-only mode" that never syncs to the cloud and stores data in IndexedDB. Useful for privacy-minded users and quick demos.
- Permission-first notifications: implement a small in-app permission explainer that appears before the browser permission prompt (better consent and higher opt-in rates).
- Lightweight natural-language capture variants: start with a conservative parser for expressions like "tomorrow 6pm", "in 30m", "60m" rather than full NL processing — keeps weight small and UX predictable.
- Quiet hours / smart snooze: let users set a daily quiet window; scheduled reminders automatically defer to the first available time slot after quiet ends.
- Per-task focus mode: a single-click focus state that dims UI chrome, mutes non-essential notifications, and optionally starts a soft timer.
- Recovery-first streaks: when a streak breaks, surface a recovery path rather than resetting shamefully — e.g., "Missed yesterday? Tap to mark a recovery day.".
- Minimal templates: provide 3 tiny templates (Morning Review, Deep Work 60m, Short Walk) users can apply with one tap.
- Export & portability: add JSON export/import for tasks so users can keep copies and migrate easily.
- Accessibility checklist entry: include a simple checklist in the repo for a11y (contrast, keyboard nav, focus order, labels) to keep engineering aligned.

## Micro-interactions & copy that matter

- Permission copy: explain benefits ("Receive a gentle reminder to start your task") and how to revoke.
- Empty states: use calm, encouraging language that nudges users to add 1–3 goals today rather than overwhelming lists.
- Success micro-copy: celebrate small wins with short, friendly messages like "Nice — one meaningful thing done." Keep animations subtle.

## Engineering checkpoints

- Add a tiny a11y smoke test (axe-core) to CI for main pages.
- Add typing guard rails for the Task model and API shapes; include tests for serialization of startAt/endAt and timezone behavior.
- Document required env vars and local dev steps in `README.md` (including how to run Prisma generate and local DB config or local-only mode).

## Concrete artifacts I can create now

Pick one and I'll implement it next:

1. POC Quick-capture component (React) that parses conservative time expressions and returns a Task payload. Includes inline parsed preview and a small unit test.
2. Small Notification POC: a component that requests permission, registers a simple service worker stub, and fires a test notification (client-only flow).
3. Repo checklist PR: add `README.md` entries, an `a11y-check.md` checklist, and a tiny GitHub Actions job that runs an a11y smoke test on `app/page.tsx`.

If you prefer, tell me which artifact (1, 2, or 3) to build and I'll implement it and validate locally.
