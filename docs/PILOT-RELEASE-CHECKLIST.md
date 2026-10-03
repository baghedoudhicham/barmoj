# Barmoj family pilot release boundary

**Release type:** moderated, parent-supervised product pilot  
**Interface:** Arabic-first. The full first-track curriculum content is available in Arabic, English and French at /curriculum.  
**Interactive learning:** four of twelve missions. The other eight are curriculum prompts and optional family activities, not completed interactive lessons.

## What this build does

- Gives a parent or trusted adult a clear supervision reminder before entering the child space.
- Uses an optional nickname; older local profiles are migrated to remove the parent-name and exact-age fields.
- Removes the old prototype's local page-view and feedback event records on startup.
- Saves mission drafts and evidence in the current browser's local storage.
- Shows the parent dated examples of thinking and offers a way to remove every Barmoj local-storage record for this site.
- Offers short, finite activities with no timer, streak, public comparison, ads, payments, account sync, child-facing AI or product analytics.
- Self-hosts the Noto Kufi Arabic font files and includes their SIL Open Font License.
- Applies a restrictive content policy and baseline browser security headers through Firebase Hosting.

## Limits families should understand

- A local browser profile is not an account, encrypted vault or backup. Anyone who uses the same browser profile can open the kid space and parent dashboard.
- The adult checkbox is a reminder, not verified guardian identity or legal consent.
- Typed observations, predictions and explanations are saved locally. Families should not enter a child's full name, school, address, contact details, health information or other sensitive details.
- Browser storage stays on the device until the family deletes it or the browser clears it. There is no cross-device recovery.
- Firebase Hosting serves the web pages. The app code does not transmit profile or answer content to an application backend, but the hosting provider still processes technical requests under its own service terms.
- This is not a claim of legal compliance, clinical benefit or proven improvement in attention or intelligence.

## Before opening public registration

1. Name the service operator and provide a real family-support contact.
2. Get qualified local review of Moroccan data-protection, guardian-consent, retention and cross-border hosting requirements. The CNDP publishes [Law 09-08](https://www.cndp.ma/images/lois/Loi-09-08-Fr.pdf) and [filing information](https://www.cndp.ma/); do not treat this checklist as legal advice.
3. Replace the supervision reminder with an age-appropriate guardian flow if the product begins collecting or transmitting personal data.
4. Test keyboard access, screen readers, contrast, reading load and RTL/LTR behavior with families; verify children can stop and resume without pressure.
5. Run the moderated family pilot, review de-identified observations with caregivers and educators, and build the remaining eight labs only from what the evidence supports.
6. Complete a name and trademark search before a wider launch. Barmoj is close in sound and spelling to Barmej, which operates in the neighboring Arabic learning category. Keep the current name for the supervised pilot while that risk is checked.
7. Add accounts, payments, remote analytics, AI or social features only after their separate privacy, security, adult-control and deletion design is ready.
8. Review the Muslim-family values reflection with parents and Muslim educators across the intended communities. Any later Qur'an or hadith quotation needs verified Arabic text, source and context, a reviewed translation, and must remain outside rewards, scores and streaks.

## Deployment

The production Firebase target is barmoj-266b8 at https://barmoj-266b8.web.app/. Pushes to main run the test/build workflow and deploy Hosting using the repository secret FIREBASE_SERVICE_ACCOUNT_BARMOJ_266B8. Feature branches run checks without deployment. Preview channels should be used to inspect a release candidate before merging it to main.
