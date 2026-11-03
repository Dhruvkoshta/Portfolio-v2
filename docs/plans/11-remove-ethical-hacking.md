# Plan 11: Remove Ethical Hacking Section

## 1. Overview & Requirements
The user explicitly requested:
"11. remove Ethical Hacking section completely"

Currently, the portfolio contains an Ethical Hacking section registered in `src/lib/sections.ts`, rendered in `src/routes/index.tsx`, with content in `src/components/site/sections-content.tsx` (`EthicalHackingSection`).

## 2. Technical Scope of Changes
1. **`src/lib/sections.ts`**:
   - Remove entry `{ id: "ethical-hacking", label: "Ethical Hacking", num: "08" }`.
   - Re-number subsequent section numbers so the sequence remains continuous (01 through 14).
2. **`src/routes/index.tsx`**:
   - Remove `case "ethical-hacking": return <EthicalHackingSection />` from `sectionContent()`.
   - Remove `EthicalHackingSection` import.
3. **`src/components/site/sections-content.tsx`**:
   - Safely remove or deprecate `EthicalHackingSection` export.
4. **`src/data/content.ts`**:
   - Remove `securityDisclosures` data export and corresponding tests in `src/data/content.test.ts`.
5. **E2E & Unit Tests**:
   - Update `tests/e2e/home.spec.ts` section count assertions (`.ed-section` count reduces from 15 to 14).

## 3. Implementation Steps
1. Delete `ethical-hacking` section from registry and router.
2. Clean up CSS references if any specific rules exist.
3. Update tests to match 14 total sections.
4. Run `npm run typecheck`, `npm run lint`, and `npm run test` to verify zero dangling references.

## 4. Acceptance Criteria
- [ ] Ethical Hacking section is completely removed from the DOM, navigation menu, and router.
- [ ] All section numbers cleanly sequence without gaps.
- [ ] All quality gates and tests pass with 0 errors.
