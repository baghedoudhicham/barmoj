# Barmoj — برموج

Arabic-first learning product for children in Morocco, focused on **problem solving → computational thinking → programming → digital creation**.

> نتعلّم كيف نفكّر، ثم كيف نبرمج.

## MVP

The first release is deliberately narrow:

- Parent signup and child profile
- One learning track with 10–12 short missions
- Mission player with progress and XP
- Kid home with a clear “continue learning” loop
- Parent progress dashboard and weekly summary
- Optional WhatsApp sharing/reminders
- Lightweight internal content console

AI initially assists the Barmoj team with curriculum/content production and review. It is not an unrestricted child-facing tutor in V1.

## Product loop

Parent signup → child profile → learning track → mission → result + XP → progress → weekly parent summary → return.

## Pilot

Start with 20–30 Moroccan families. Measure:

1. First-mission completion
2. Three missions completed within seven days
3. Weekly child return
4. Parent-summary engagement
5. Intent to continue

Community, a store, public leaderboards and broad AI features stay outside the MVP until this loop is validated.

## Design

- Arabic / RTL first
- Alexandria typography
- Ink: `#151515`
- Paper: `#F7F7F2`
- Learn: `#39DD59`
- Explore: `#FFC107`
- Challenge: `#FF164D`
- Deep green: `#173E2B`

Figma: https://www.figma.com/design/IUHArEYFbaEqPcX66Q1rRh/barmoj

## Planned app architecture

```
apps/web
  public landing
  parent onboarding
  kid home
  mission player
  parent dashboard
  internal content console

packages/
  ui
  curriculum
  analytics
```

Initial implementation target: TypeScript, React/Next.js, Tailwind CSS and Firebase for authentication/data/hosting where appropriate.

## Build order

1. Design system + responsive landing
2. Parent onboarding + child setup
3. Kid home
4. Mission player + completion state
5. Parent dashboard
6. Content console
7. Analytics instrumentation
8. Pilot QA and launch
