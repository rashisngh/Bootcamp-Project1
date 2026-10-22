import { ShortCompanyJson, SkillLevelJson } from '../data/seedCompanies';

export type CategoryType = 'Super Dream' | 'Dream' | 'Standard' | 'Regular';
export type BloomLevel = 'CU' | 'AP' | 'AS' | 'EV' | 'CR';
export type Criticality = 'Critical' | 'Important' | 'Baseline';
export type Difficulty = 'EXPERT' | 'ADVANCED' | 'PRO' | 'BEGINNER';

export const BLOOM_DETAILS: Record<BloomLevel, { name: string; full: string; color: string; bg: string; border: string }> = {
  CU: { name: 'CU', full: 'Conceptual Understanding', color: '#3b82f6', bg: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
  AP: { name: 'AP', full: 'Application', color: '#22c55e', bg: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200' },
  AS: { name: 'AS', full: 'Analysis', color: '#eab308', bg: 'bg-amber-50 text-amber-700', border: 'border-amber-200' },
  EV: { name: 'EV', full: 'Evaluation', color: '#ef4444', bg: 'bg-red-50 text-red-700', border: 'border-red-200' },
  CR: { name: 'CR', full: 'Creation', color: '#a855f7', bg: 'bg-purple-50 text-purple-700', border: 'border-purple-200' },
};

export const CATEGORY_COLORS: Record<CategoryType, { hex: string; bg: string; text: string; border: string }> = {
  'Super Dream': { hex: '#7c3aed', bg: 'bg-purple-50', text: 'text-[#7c3aed]', border: 'border-purple-200' },
  'Dream': { hex: '#2563eb', bg: 'bg-blue-50', text: 'text-[#2563eb]', border: 'border-blue-200' },
  'Standard': { hex: '#16a34a', bg: 'bg-green-50', text: 'text-[#16a34a]', border: 'border-green-200' },
  'Regular': { hex: '#d97706', bg: 'bg-amber-50', text: 'text-[#d97706]', border: 'border-amber-200' },
};

export interface CompanySummary {
  id: number;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: CategoryType;
  incorporation_year: number;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string[];
  office_locations: string[];
  yoy_growth_rate: string;
  website_url: string;
}

export interface DashboardSkill {
  id: number;
  name: string;
  level: number;
  proficiency: string;
  bloom: BloomLevel;
  bloomDetails: typeof BLOOM_DETAILS[BloomLevel];
  criticality: Criticality;
  difficulty: Difficulty;
}

export interface CompanyProfile {
  [key: string]: any;
}

// Helpers
export function asString(val: any): string {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

export function asRecord(val: any): Record<string, any> {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return val;
  }
  return {};
}

export function splitItems(val: string | string[]): string[] {
  if (Array.isArray(val)) {
    return val.map(s => s.trim()).filter(Boolean);
  }
  if (!val) return [];
  return String(val)
    .split(/[\n;•]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

export function titleCaseFromCode(code: string): string {
  return code
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function scoreToDifficulty(score: number): Difficulty {
  if (score >= 8) return 'EXPERT';
  if (score >= 6) return 'ADVANCED';
  if (score >= 4) return 'PRO';
  return 'BEGINNER';
}

export function proficiencyToBloom(level: number): BloomLevel {
  if (level <= 2) return 'CU';
  if (level <= 4) return 'AP';
  if (level <= 6) return 'AS';
  if (level <= 8) return 'EV';
  return 'CR';
}

export function scoreToCriticality(score: number): Criticality {
  if (score >= 7) return 'Critical';
  if (score >= 5) return 'Important';
  return 'Baseline';
}

export function isNullish(val: any): boolean {
  if (val === null || val === undefined) return true;
  const s = String(val).trim().toLowerCase();
  return (
    s === '' ||
    s === 'na' ||
    s === 'n/a' ||
    s === 'none' ||
    s === '-' ||
    s === 'null' ||
    s === 'undefined' ||
    s === 'not applicable'
  );
}

export function normalizeCompanySummary(shortJson: ShortCompanyJson, id: number = 1): CompanySummary {
  const short = asRecord(shortJson);
  const rawType = asString(short.company_type) as CategoryType;
  const validTypes: CategoryType[] = ['Super Dream', 'Dream', 'Standard', 'Regular'];
  const company_type: CategoryType = validTypes.includes(rawType) ? rawType : 'Dream';

  return {
    id,
    name: asString(short.name) || 'Company Name',
    short_name: asString(short.short_name) || asString(short.name),
    logo_url: asString(short.logo_url),
    category: asString(short.category) || 'Enterprise',
    company_type,
    incorporation_year: Number(short.incorporation_year) || 1990,
    employee_size: asString(short.employee_size) || 'Not publicly available',
    headquarters_address: asString(short.headquarters_address) || 'Not publicly available',
    operating_countries: splitItems(asString(short.operating_countries)),
    office_locations: splitItems(asString(short.office_locations)),
    yoy_growth_rate: asString(short.yoy_growth_rate) || 'N/A',
    website_url: asString(short.website_url),
  };
}

export function normalizeCompanyProfile(
  fullJson: Record<string, any>,
  shortJson?: ShortCompanyJson
): CompanyProfile {
  const full = asRecord(fullJson);
  const short = asRecord(shortJson);
  // Merged profile, ensuring NO CTC/Stipend/Selection-ratio keys ever appear
  const merged: Record<string, any> = { ...short, ...full };

  // Hard constraint: remove CTC, Stipend, Selection Ratio if they ever sneak in
  delete merged.ctc;
  delete merged.salary;
  delete merged.stipend;
  delete merged.selection_ratio;
  delete merged.ctc_breakup;
  delete merged.average_ctc;
  delete merged.highest_ctc;

  return merged;
}

export function normalizeDashboardSkills(skillLevels: SkillLevelJson[] = []): DashboardSkill[] {
  return (skillLevels || []).map((skill) => {
    const level = Number(skill.required_level) || 1;
    const bloom = proficiencyToBloom(level);
    return {
      id: skill.skill_set_id,
      name: asString(skill.skill_set_name),
      level,
      proficiency: asString(skill.required_proficiency) || 'Intermediate',
      bloom,
      bloomDetails: BLOOM_DETAILS[bloom],
      criticality: scoreToCriticality(level),
      difficulty: scoreToDifficulty(level),
    };
  });
}
