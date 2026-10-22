import { describe, it, expect } from 'vitest';
import { SEED_COMPANIES } from './data/seedCompanies';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  proficiencyToBloom,
  scoreToCriticality,
} from './lib/companyData';
import { buildIntelligenceSections } from './data/intelligenceData';
import { SKILL_TOPICS_ROADMAP } from './data/skillTopics';

describe('JSSATE Placement Intelligence Hub - Smoke Tests', () => {
  it('loads SEED_COMPANIES with valid Accenture reference data', () => {
    expect(SEED_COMPANIES.length).toBeGreaterThanOrEqual(1);
    const accenture = SEED_COMPANIES[0];
    expect(accenture.short_json.name).toBe('Accenture plc');
    expect(accenture.short_json.company_type).toBe('Dream');
  });

  it('normalizes company summary correctly', () => {
    const accenture = SEED_COMPANIES[0];
    const summary = normalizeCompanySummary(accenture.short_json, accenture.company_id);
    expect(summary.name).toBe('Accenture plc');
    expect(summary.short_name).toBe('Accenture');
    expect(summary.company_type).toBe('Dream');
  });

  it('enforces hard constraints: zero CTC, Stipend, or Selection Ratio fields', () => {
    const accenture = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(accenture.full_json, accenture.short_json);
    expect(profile.ctc).toBeUndefined();
    expect(profile.salary).toBeUndefined();
    expect(profile.stipend).toBeUndefined();
    expect(profile.selection_ratio).toBeUndefined();
  });

  it('builds exactly 22 intelligence sections in correct order', () => {
    const accenture = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(accenture.full_json, accenture.short_json);
    const sections = buildIntelligenceSections(profile);
    expect(sections.length).toBe(22);
    expect(sections[0].title).toBe('Company Identity');
    expect(sections[21].title).toBe('Contact Information');
  });

  it('maps skills to Bloom taxonomy and criticality levels correctly', () => {
    expect(proficiencyToBloom(8)).toBe('EV');
    expect(proficiencyToBloom(4)).toBe('AP');
    expect(proficiencyToBloom(1)).toBe('CU');
    expect(scoreToCriticality(8)).toBe('Critical');
    expect(scoreToCriticality(5)).toBe('Important');
    expect(scoreToCriticality(4)).toBe('Baseline');

    const accenture = SEED_COMPANIES[0];
    const skills = normalizeDashboardSkills(accenture.skill_levels);
    expect(skills.length).toBe(12);
  });

  it('contains 10-level topic ladders for all 12 skills', () => {
    for (let id = 1; id <= 12; id++) {
      const roadmap = SKILL_TOPICS_ROADMAP[id];
      expect(roadmap).toBeDefined();
      expect(roadmap.length).toBe(10);
      expect(roadmap[0].level_number).toBe(1);
      expect(roadmap[9].level_number).toBe(10);
    }
  });

  it('verifies Supabase client initialization without throw', async () => {
    const { supabaseUrl, isSupabaseConfigured } = await import('./lib/supabaseClient');
    expect(typeof supabaseUrl).toBe('string');
    expect(typeof isSupabaseConfigured).toBe('boolean');
  });
});
