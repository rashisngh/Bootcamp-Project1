# JSSATE Noida Companies Research & Placement Analytics Portal

> Also known as **JSSATE Placement Intelligence Hub**
> **College Name:** JSS Academy of Technical Education Noida  
> **Short Name:** JSSATE  

---

## 📌 Phase 1 Scope & Architecture (UI-Only)

1. **Pure UI & Seed-Driven**: Phase 1 is an entirely client-side, mobile-first single page application (SPA) built with React 19, Vite, TypeScript, and Tailwind CSS.
2. **Hardcoded Seed Dataset**: All company intelligence and competency roadmaps are sourced from `src/data/seedCompanies.ts` (featuring Accenture plc as the enterprise reference record) and `src/data/skillTopics.ts` (featuring comprehensive 10-level competency ladders across all 12 skills).
3. **Fully Public Access (No Login)**: In accordance with core requirements, there is **no authentication system**, no `/login` route, no `AuthContext`, and no `ProtectedRoute`. Every route is directly reachable by visitors, campus students, and recruiters.
4. **College Branding**: Text-based wordmarks and status indicators are used exclusively (`JSSATE · INTELLIGENCE PLATFORM`). In compliance with constraints, no college logo image asset is stored or loaded.
5. **No CTC / Stipend / Selection Ratio**: All salary, stipend, and selection-ratio metrics are strictly excluded from all views and normalizers to maintain institutional confidentiality.
6. **Phase 2 Migration Ready**: The data normalizers in `src/lib/companyData.ts` (`normalizeCompanySummary`, `normalizeCompanyProfile`, `normalizeDashboardSkills`) accept the exact JSON shapes (`short_json`, `full_json`, `skill_levels`) designed for future database table columns. Swapping the seed data for live database records will require only a single data layer connection file.

---

## 🚀 Key Routes & Navigation

- `/` — **Recruiters Portal Index**: Hero search with 200ms debouncing, live category filter counts (*Super Dream, Dream, Standard, Regular*), and responsive enterprise cards. Clicking any card stores the selection in `localStorage` under `selected-company` and navigates to the intelligence dashboard.
- `/company` — Automatically redirects to `/company/intelligence`.
- `/company/intelligence` — **22 In-Depth Intelligence Sections** (from *Company Identity* to *Contact Information*) with sticky top bar, quick external links, and scroll-spy sticky tab navigation.
- `/company/skills` — **Recruiter Skill Intelligence**: 12 core competencies sorted descending by target proficiency score, with interactive Bloom cognitive taxonomy badges (*CU, AP, AS, EV, CR*), criticality tiers (*Critical, Important, Baseline*), and expandable 10-level learning roadmaps.
- `*` — Unmatched 404 handler with return CTA.

---

## ⚡ Phase 2 — Supabase Read-Only Integration

Phase 2 connects the portal to a read-only Supabase PostgreSQL database:

```bash
# Paste VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY into .env, then:
npm install && npm run dev
```

### Critical Data Architecture
- **Single Table Company JSON**: No 90+ normalized table joins. All company listing and detail cards are powered from `public.company_json`:
  - `company_json.company_id` (int)
  - `company_json.short_json` (jsonb) → Cards / listing
  - `company_json.full_json` (jsonb) → Full 22 sections detail
- **4 Skill Tables**:
  - `public.company_skill_levels` (company_id, skill_set_id, required_level, required_proficiency_level_id)
  - `public.skill_set_master` (skill_set_id, skill_set_name, short_name)
  - `public.proficiency_levels` (proficiency_level_id, proficiency_name, proficiency_code)
  - `public.skill_set_topics` (skill_set_id, level_number, topics)
- **Zero-Friction Fallback**: When offline or if credentials are unset, the app gracefully falls back to the verified seed dataset without interruption.
- **Strict Hard Constraints**: Read-only, no auth/login, no CTC/Stipend/Selection-Ratio data.

---

## 🛠️ Testing & Verification

Run the test suite:

```bash
npm run test
```

Build for production:

```bash
npm run build
```
