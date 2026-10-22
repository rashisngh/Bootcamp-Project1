import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SEED_COMPANIES, SeedCompany, SkillLevelJson } from '../data/seedCompanies';
import { SKILL_TOPICS_ROADMAP, SkillTopicLevel } from '../data/skillTopics';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  CompanySummary,
  CompanyProfile,
  DashboardSkill,
} from './companyData';

export interface CompanyCardItem {
  company_id: number;
  short_json: any;
  summary: CompanySummary;
  raw?: SeedCompany;
}

export interface CompanyProfileResult {
  company_id: number;
  short_json: any;
  full_json: any;
  profile: CompanyProfile;
}

export interface CompanySkillsResult {
  skills: DashboardSkill[];
  roadmaps: Record<number, SkillTopicLevel[]>;
}

/**
 * Hook 1: useCompanies()
 * SELECT company_id, short_json FROM company_json
 * maps through normalizeCompanySummary(short_json)
 */
export function useCompanies() {
  return useQuery<CompanyCardItem[], Error>({
    queryKey: ['companies'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) {
        // Seed fallback
        return SEED_COMPANIES.map((c) => ({
          company_id: c.company_id,
          short_json: c.short_json,
          summary: normalizeCompanySummary(c.short_json, c.company_id),
          raw: c,
        }));
      }

      try {
        const { data, error } = await supabase
          .from('company_json')
          .select('company_id, short_json');

        if (error) {
          console.warn('[useCompanies] Supabase query error, falling back to seed:', error.message);
          return SEED_COMPANIES.map((c) => ({
            company_id: c.company_id,
            short_json: c.short_json,
            summary: normalizeCompanySummary(c.short_json, c.company_id),
            raw: c,
          }));
        }

        if (!data || data.length === 0) {
          console.info('[useCompanies] Table company_json is empty, using seed dataset.');
          return SEED_COMPANIES.map((c) => ({
            company_id: c.company_id,
            short_json: c.short_json,
            summary: normalizeCompanySummary(c.short_json, c.company_id),
            raw: c,
          }));
        }

        return data.map((row: any) => ({
          company_id: row.company_id,
          short_json: row.short_json,
          summary: normalizeCompanySummary(row.short_json, row.company_id),
        }));
      } catch (err: any) {
        console.error('[useCompanies] Unexpected error fetching from Supabase:', err);
        return SEED_COMPANIES.map((c) => ({
          company_id: c.company_id,
          short_json: c.short_json,
          summary: normalizeCompanySummary(c.short_json, c.company_id),
          raw: c,
        }));
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook 2: useCompanyProfile(id)
 * SELECT company_id, short_json, full_json FROM company_json WHERE company_id = id
 * maps through normalizeCompanyProfile(full_json, short_json)
 */
export function useCompanyProfile(companyId?: number | null) {
  const targetId = companyId || 1;

  return useQuery<CompanyProfileResult, Error>({
    queryKey: ['companyProfile', targetId],
    queryFn: async () => {
      const fallbackCompany =
        SEED_COMPANIES.find((c) => c.company_id === targetId) || SEED_COMPANIES[0];

      if (!isSupabaseConfigured || !supabase) {
        return {
          company_id: fallbackCompany.company_id,
          short_json: fallbackCompany.short_json,
          full_json: fallbackCompany.full_json,
          profile: normalizeCompanyProfile(fallbackCompany.full_json, fallbackCompany.short_json),
        };
      }

      try {
        const { data, error } = await supabase
          .from('company_json')
          .select('company_id, short_json, full_json')
          .eq('company_id', targetId)
          .maybeSingle();

        if (error) {
          console.warn(`[useCompanyProfile] Error for company ${targetId}:`, error.message);
          return {
            company_id: fallbackCompany.company_id,
            short_json: fallbackCompany.short_json,
            full_json: fallbackCompany.full_json,
            profile: normalizeCompanyProfile(fallbackCompany.full_json, fallbackCompany.short_json),
          };
        }

        if (!data) {
          console.info(`[useCompanyProfile] No row found for id ${targetId}, using fallback.`);
          return {
            company_id: fallbackCompany.company_id,
            short_json: fallbackCompany.short_json,
            full_json: fallbackCompany.full_json,
            profile: normalizeCompanyProfile(fallbackCompany.full_json, fallbackCompany.short_json),
          };
        }

        return {
          company_id: data.company_id,
          short_json: data.short_json,
          full_json: data.full_json,
          profile: normalizeCompanyProfile(data.full_json, data.short_json),
        };
      } catch (err: any) {
        console.error('[useCompanyProfile] Error fetching profile:', err);
        return {
          company_id: fallbackCompany.company_id,
          short_json: fallbackCompany.short_json,
          full_json: fallbackCompany.full_json,
          profile: normalizeCompanyProfile(fallbackCompany.full_json, fallbackCompany.short_json),
        };
      }
    },
    enabled: Boolean(targetId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook 3: useCompanySkills(id)
 * Queries the 4 tables:
 * - company_skill_levels
 * - skill_set_master
 * - proficiency_levels
 * - skill_set_topics
 * Assembles rows, maps through normalizeDashboardSkills(...) and topic roadmaps
 */
export function useCompanySkills(companyId?: number | null) {
  const targetId = companyId || 1;

  return useQuery<CompanySkillsResult, Error>({
    queryKey: ['companySkills', targetId],
    queryFn: async () => {
      const fallbackCompany =
        SEED_COMPANIES.find((c) => c.company_id === targetId) || SEED_COMPANIES[0];

      const fallbackResult: CompanySkillsResult = {
        skills: normalizeDashboardSkills(fallbackCompany.skill_levels),
        roadmaps: SKILL_TOPICS_ROADMAP,
      };

      if (!isSupabaseConfigured || !supabase) {
        return fallbackResult;
      }

      try {
        // Query the 4 specific tables in parallel
        const [skillLevelsRes, skillMasterRes, profLevelsRes, topicsRes] = await Promise.all([
          supabase
            .from('company_skill_levels')
            .select('*')
            .eq('company_id', targetId),
          supabase.from('skill_set_master').select('*'),
          supabase.from('proficiency_levels').select('*'),
          supabase.from('skill_set_topics').select('*'),
        ]);

        if (skillLevelsRes.error) {
          console.warn('[useCompanySkills] company_skill_levels error:', skillLevelsRes.error.message);
          return fallbackResult;
        }

        const skillLevelsData = skillLevelsRes.data;
        if (!skillLevelsData || skillLevelsData.length === 0) {
          console.info(`[useCompanySkills] No skill levels in DB for company ${targetId}, using fallback.`);
          return fallbackResult;
        }

        const skillMasterMap = new Map<number, string>();
        if (skillMasterRes.data) {
          skillMasterRes.data.forEach((row: any) => {
            skillMasterMap.set(row.skill_set_id, row.skill_set_name || row.short_name);
          });
        }

        const profMap = new Map<number, string>();
        if (profLevelsRes.data) {
          profLevelsRes.data.forEach((row: any) => {
            profMap.set(row.proficiency_level_id, row.proficiency_name || row.proficiency_code);
          });
        }

        // Build SkillLevelJson items
        const assembledLevels: SkillLevelJson[] = skillLevelsData.map((row: any) => {
          const skillName =
            skillMasterMap.get(row.skill_set_id) || `Skill #${row.skill_set_id}`;
          const profName =
            profMap.get(row.required_proficiency_level_id) || 'Intermediate';

          return {
            skill_set_id: row.skill_set_id,
            skill_set_name: skillName,
            required_level: Number(row.required_level) || 5,
            required_proficiency: profName,
          };
        });

        // Build roadmaps from skill_set_topics
        const assembledRoadmaps: Record<number, SkillTopicLevel[]> = {};
        if (topicsRes.data && topicsRes.data.length > 0) {
          topicsRes.data.forEach((row: any) => {
            const skillId = row.skill_set_id;
            const lvl = Number(row.level_number) || 1;
            const topicText = row.topics || row.topic || `Topic for level ${lvl}`;

            if (!assembledRoadmaps[skillId]) {
              assembledRoadmaps[skillId] = [];
            }
            assembledRoadmaps[skillId].push({
              level_number: lvl,
              topic: topicText,
            });
          });

          // Sort each skill's levels 1..10
          Object.keys(assembledRoadmaps).forEach((key) => {
            const numKey = Number(key);
            assembledRoadmaps[numKey].sort((a, b) => a.level_number - b.level_number);
          });
        }

        // Merge with fallback roadmap if any skill is missing in DB topics
        const finalRoadmaps: Record<number, SkillTopicLevel[]> = {
          ...SKILL_TOPICS_ROADMAP,
          ...assembledRoadmaps,
        };

        return {
          skills: normalizeDashboardSkills(assembledLevels),
          roadmaps: finalRoadmaps,
        };
      } catch (err: any) {
        console.error('[useCompanySkills] Error assembling skills data:', err);
        return fallbackResult;
      }
    },
    enabled: Boolean(targetId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
