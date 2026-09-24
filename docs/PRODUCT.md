# Barmoj MVP Product Specification

## Goal

Validate a compact Arabic-first learning loop for Moroccan children aged 7–14 before expanding Barmoj into a broader learning platform.

## Users

### Parent
Creates the account, creates/manages child profiles, understands progress and controls communication.

### Child
Completes short structured missions, earns XP and sees a clear next action.

### Barmoj team
Creates, reviews, publishes and reorders curriculum content through a small internal console.

## V1 flows

### Acquisition
Landing → parent CTA → signup.

### Onboarding
Parent details → child nickname/name → age band → prior programming exposure → starter track.

### Learning
Kid home → continue mission → problem/prompt → interaction/choice → check → explanation → XP → next mission.

### Parent loop
Dashboard → weekly activity → skill insight → next skill → optional WhatsApp summary.

## Starter curriculum

One track, 10–12 missions.

1. Sequences
2. Breaking a problem into steps
3. Patterns
4. Repetition
5. Loops
6. Conditions
7. Events
8. Variables as containers
9. Debugging
10. Combine concepts
11. Mini build
12. Final starter project

Mission target: roughly 4–8 minutes each.

## Core entities

- User
- ParentProfile
- ChildProfile
- Track
- Mission
- MissionStep
- Enrollment
- MissionAttempt
- Progress
- XPEvent
- WeeklySummary

## Initial event model

- signup_started
- signup_completed
- child_profile_created
- track_started
- mission_started
- mission_step_completed
- mission_completed
- mission_abandoned
- kid_home_returned
- parent_dashboard_viewed
- weekly_summary_viewed
- whatsapp_summary_shared

## Pilot gates

Do not add major feature surface until we can answer:

- Do children complete the first mission?
- Do they complete at least three missions in the first seven days?
- Do they return the following week?
- Do parents understand the learning progress?
- Do families want to continue?

## Explicitly out of scope for V1

- Public social/community layer
- Public leaderboard
- Store/economy
- Open-ended child-facing AI chat
- Multiple large curriculum tracks
- Live classes
- Native mobile apps

## Safety/product principles

Collect minimal child data. Parent owns the account and communication settings. Avoid public child profiles and unrestricted child-to-child communication in V1. Keep AI content assistance behind the Barmoj team review process.
