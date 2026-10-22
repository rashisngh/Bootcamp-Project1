import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Layers,
  BookOpen,
} from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CompanyLogo } from '../components/CompanyLogo';
import { BLOOM_DETAILS } from '../lib/companyData';
import { useCompanySkills } from '../lib/companyApi';

export default function SkillIntelligence() {
  const { selectedCompany } = useCompany();
  const [expandedSkills, setExpandedSkills] = useState<Record<number, boolean>>({});

  // Supabase hook querying the 4 skill tables:
  // company_skill_levels, skill_set_master, proficiency_levels, skill_set_topics
  const {
    data: skillsResult,
    isLoading,
    isError,
    error,
    refetch,
  } = useCompanySkills(selectedCompany?.company_id);

  const skills = useMemo(() => {
    if (!skillsResult?.skills) return [];
    // Sort descending by level
    return [...skillsResult.skills].sort((a, b) => b.level - a.level);
  }, [skillsResult]);

  const roadmaps = skillsResult?.roadmaps || {};

  const toggleExpand = (id: number) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    skills.forEach((s) => (allExpanded[s.id] = true));
    setExpandedSkills(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSkills({});
  };

  if (!selectedCompany) {
    return null;
  }

  const short = selectedCompany.short_json || {};

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Header: Company Logo + "{Company} Skill Intelligence" */}
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CompanyLogo
                name={short.name || 'Company'}
                logoUrl={short.logo_url}
                websiteUrl={short.website_url}
                companyType={short.company_type}
                category={short.category}
                size="lg"
                className="rounded-xl shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Recruiter Benchmark
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {skills.length} Target Competencies
                  </span>
                </div>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
                  {short.short_name || short.name || 'Company'} Skill Intelligence
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Prescribed technical competency ladder, Bloom taxonomy tiers, and target preparation roadmaps
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Error Notification */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-900">
                  Failed to synchronize skill matrices from database
                </p>
                <p className="text-[11px] text-red-600">
                  {error?.message || 'Using local verified skill models.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* Bloom 5-Column Legend */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h2 className="font-heading font-bold text-sm text-slate-900">
                Bloom&apos;s Revised Cognitive Taxonomy Scale
              </h2>
            </div>
            <span className="text-[11px] text-slate-500">Scale: Levels 1–10</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {(
              [
                { code: 'CU', label: 'Conceptual Understanding', levels: 'Levels 1–2', hex: '#3b82f6', desc: 'Recall facts, explain concepts, basic principles' },
                { code: 'AP', label: 'Application', levels: 'Levels 3–4', hex: '#22c55e', desc: 'Implement algorithms, execute code in standard scenarios' },
                { code: 'AS', label: 'Analysis', levels: 'Levels 5–6', hex: '#eab308', desc: 'Deconstruct architectures, trace edge cases & bugs' },
                { code: 'EV', label: 'Evaluation', levels: 'Levels 7–8', hex: '#ef4444', desc: 'Assess trade-offs, optimize performance & complexity' },
                { code: 'CR', label: 'Creation', levels: 'Levels 9–10', hex: '#a855f7', desc: 'Synthesize novel designs, full-system architecture' },
              ] as const
            ).map((item) => (
              <div
                key={item.code}
                className="rounded-lg p-3 border transition-shadow hover:shadow-xs"
                style={{
                  backgroundColor: `${item.hex}08`,
                  borderColor: `${item.hex}30`,
                }}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className="font-bold text-xs px-2 py-0.5 rounded-md text-white font-mono"
                    style={{ backgroundColor: item.hex }}
                  >
                    {item.code}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {item.levels}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xs text-slate-800 line-clamp-1 mt-1">
                  {item.label}
                </h3>
                <p className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Criticality 3-Card Legend */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-l-4 border-l-red-500 border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-red-700">Critical Priority</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                Level ≥ 7
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Mandatory filter in online assessments and initial technical elimination rounds. High bar expected.
            </p>
          </div>

          <div className="bg-white border-l-4 border-l-amber-500 border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-amber-700">Important Priority</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Level 5–6
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Frequently probed during deep-dive technical interviews and project architecture discussions.
            </p>
          </div>

          <div className="bg-white border-l-4 border-l-blue-500 border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-blue-700">Baseline Priority</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Level &lt; 5
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Conceptual familiarity expected; demonstrates versatility and foundational engineer readiness.
            </p>
          </div>
        </section>

        {/* Skill Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-heading font-bold text-lg text-slate-900">
              Required Competency Benchmarks ({skills.length})
            </h2>
            <span className="text-xs text-slate-500">
              Click any skill to view the step-by-step 10-level mastery roadmap
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs animate-pulse flex items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="w-32 h-4 bg-slate-200 rounded" />
                    <div className="w-48 h-5 bg-slate-300 rounded" />
                  </div>
                  <div className="w-48 h-4 bg-slate-200 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {skills.map((skill) => {
                const isExpanded = !!expandedSkills[skill.id];
                const bloomInfo = BLOOM_DETAILS[skill.bloom];
                const roadmap = roadmaps[skill.id] || [];

                const criticalityStyles = {
                  Critical: 'bg-red-50 text-red-700 border-red-200',
                  Important: 'bg-amber-50 text-amber-700 border-amber-200',
                  Baseline: 'bg-blue-50 text-blue-700 border-blue-200',
                };

                return (
                  <div
                    key={skill.id}
                    className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden transition-all duration-200"
                  >
                    {/* Skill Card Header */}
                    <div
                      onClick={() => toggleExpand(skill.id)}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Left: Skill Name + Criticality + Bloom badge */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              criticalityStyles[skill.criticality]
                            }`}
                          >
                            {skill.criticality}
                          </span>

                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white font-mono"
                            style={{ backgroundColor: bloomInfo.color }}
                            title={bloomInfo.full}
                          >
                            {skill.bloom} · {bloomInfo.full}
                          </span>

                          <span className="text-xs font-semibold text-slate-500">
                            {skill.proficiency} Level
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 truncate">
                          {skill.name}
                        </h3>
                      </div>

                      {/* Right: Score Progress Bar + Action */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="w-48 sm:w-56">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-[11px] font-medium text-slate-500">
                              Required Threshold
                            </span>
                            <span className="font-mono font-bold text-sm text-slate-900">
                              {skill.level}
                              <span className="text-xs font-normal text-slate-400">/10</span>
                            </span>
                          </div>

                          {/* Colored Progress Bar */}
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${(skill.level / 10) * 100}%`,
                                backgroundColor: bloomInfo.color,
                              }}
                            />
                          </div>
                        </div>

                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          aria-label={isExpanded ? 'Collapse roadmap' : 'Expand roadmap'}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expandable 10-Level Roadmap */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 bg-[#F8FAFC]/70 p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                              10-Level Topic Curriculum Roadmap
                            </h4>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Target Mastery: <span className="font-bold text-slate-800">Level 1 through {skill.level}</span>
                          </span>
                        </div>

                        <div className="space-y-2">
                          {roadmap.map((lvl) => {
                            const isTargetOrBelow = lvl.level_number <= skill.level;
                            const isAtTarget = lvl.level_number === skill.level;

                            return (
                              <div
                                key={lvl.level_number}
                                className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                                  isAtTarget
                                    ? 'bg-blue-50/70 border-blue-300 text-blue-900 font-medium shadow-2xs'
                                    : isTargetOrBelow
                                    ? 'bg-white border-slate-200 text-slate-800'
                                    : 'bg-slate-100/60 border-dashed border-slate-300 text-slate-400 select-none'
                                }`}
                              >
                                {/* Level Badge */}
                                <div
                                  className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                                    isAtTarget
                                      ? 'bg-blue-600 text-white'
                                      : isTargetOrBelow
                                      ? 'bg-slate-800 text-white'
                                      : 'bg-slate-200 text-slate-400'
                                  }`}
                                >
                                  {lvl.level_number}
                                </div>

                                {/* Topic text */}
                                <div className="flex-1 min-w-0 pt-0.5">
                                  <p className={isTargetOrBelow ? 'text-slate-800' : 'text-slate-400 italic'}>
                                    {lvl.topic}
                                  </p>
                                </div>

                                {/* Status Tag */}
                                <div className="shrink-0 pt-0.5">
                                  {isAtTarget ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                      <span>Target Requirement</span>
                                    </span>
                                  ) : isTargetOrBelow ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Prerequisite</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-200/50 px-2 py-0.5 rounded-full">
                                      <Lock className="w-3 h-3 text-slate-400" />
                                      <span>Beyond scope</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
