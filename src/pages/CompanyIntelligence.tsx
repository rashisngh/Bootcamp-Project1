import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import {
  Globe,
  Linkedin,
  ExternalLink,
  Star,
  Video,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { useCompany } from '../context/CompanyContext';
import { CompanyLogo } from '../components/CompanyLogo';
import {
  buildIntelligenceSections,
  IntelligenceSection,
  FieldDefinition,
} from '../data/intelligenceData';
import {
  isNullish,
  asString,
} from '../lib/companyData';
import { useCompanyProfile } from '../lib/companyApi';

// Memoized individual field row
const FieldRow = memo(function FieldRow({ field }: { field: FieldDefinition }) {
  const { label, value, type } = field;

  const renderValue = () => {
    if (isNullish(value)) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-normal text-slate-400 bg-slate-100">
          Not Available
        </span>
      );
    }

    const valStr = asString(value);

    // URL Type
    if (type === 'url' || valStr.startsWith('http://') || valStr.startsWith('https://')) {
      return (
        <a
          href={valStr}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline font-medium text-xs sm:text-sm break-all"
        >
          <span>{valStr}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      );
    }

    // Video / YouTube type
    if (type === 'video') {
      return (
        <a
          href={valStr}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-semibold"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Watch Official Presentation / Channel</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      );
    }

    // Rating type
    if (type === 'rating' || valStr.includes('/5')) {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{valStr}</span>
        </div>
      );
    }

    // Paragraph type
    if (type === 'paragraph' || valStr.length > 140) {
      return (
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
          {valStr}
        </p>
      );
    }

    // List type or semi-colon separated items -> Auto-pill detection
    if (type === 'list' || valStr.includes(';') || (valStr.includes(',') && valStr.length > 25)) {
      const delimiter = valStr.includes(';') ? ';' : ',';
      const items = valStr
        .split(delimiter)
        .map((s) => s.trim())
        .filter(Boolean);

      if (items.length > 1) {
        return (
          <div className="flex flex-wrap gap-1.5">
            {items.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80 hover:bg-slate-200/60 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        );
      }
    }

    // Standard single value
    return (
      <span className="text-xs sm:text-sm text-slate-800 font-medium break-words">
        {valStr}
      </span>
    );
  };

  return (
    <div className="py-3 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-4 hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-b-0">
      <div className="sm:w-1/3 shrink-0">
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <div className="sm:w-2/3 min-w-0">{renderValue()}</div>
    </div>
  );
});

// Memoized section card
const SectionCard = memo(function SectionCard({
  section,
  index,
}: {
  section: IntelligenceSection;
  index: number;
}) {
  const Icon = section.icon;
  const availableCount = section.fields.filter((f) => !isNullish(f.value)).length;

  return (
    <section
      id={section.id}
      data-section-index={index}
      className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden scroll-mt-36"
    >
      {/* Section Header */}
      <div className="px-4 sm:px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 truncate">
                {section.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 truncate hidden sm:block">
              {section.description}
            </p>
          </div>
        </div>

        {/* Count Badge */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 shrink-0">
          <span className="text-blue-600 font-bold">{availableCount}</span>
          <span className="text-slate-400">/</span>
          <span>{section.fields.length} data points</span>
        </span>
      </div>

      {/* Field Rows */}
      <div className="divide-y divide-slate-100">
        {section.fields.map((field) => (
          <FieldRow key={field.key} field={field} />
        ))}
      </div>
    </section>
  );
});

export default function CompanyIntelligence() {
  const { selectedCompany } = useCompany();
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);
  const isScrollingRef = useRef<boolean>(false);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Supabase hook querying company_json for full_json & short_json
  const {
    data: profileResult,
    isLoading,
    isError,
    error,
    refetch,
  } = useCompanyProfile(selectedCompany?.company_id);

  const sections = useMemo(() => {
    const profile = profileResult?.profile || {};
    return buildIntelligenceSections(profile);
  }, [profileResult]);

  // Scroll spy setup using IntersectionObserver
  useEffect(() => {
    const sectionElements = sections.map((s) => document.getElementById(s.id));

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute('data-section-index');
            if (idxStr !== null) {
              const idx = parseInt(idxStr, 10);
              setActiveSectionIdx(idx);

              // Auto-center active tab in sticky tab bar
              if (tabListRef.current) {
                const activeTab = tabListRef.current.children[idx] as HTMLElement;
                if (activeTab) {
                  activeTab.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                  });
                }
              }
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (idx: number) => {
    const sec = sections[idx];
    if (!sec) return;
    const el = document.getElementById(sec.id);
    if (!el) return;

    setActiveSectionIdx(idx);
    isScrollingRef.current = true;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Scroll active tab into view
    if (tabListRef.current) {
      const activeTab = tabListRef.current.children[idx] as HTMLElement;
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  };

  if (!selectedCompany) {
    return null;
  }

  const short = profileResult?.short_json || selectedCompany.short_json || {};
  const full = profileResult?.full_json || {};
  const linkedinUrl = full.linkedin_url || `https://www.linkedin.com/company/${(short.short_name || 'accenture').toLowerCase()}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Sticky Top Information Bar (No hero, No gradient) */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Company Logo, Company Name, Industry Badge */}
          <div className="flex items-center gap-3.5 min-w-0">
            <CompanyLogo
              name={short.name || 'Company'}
              logoUrl={short.logo_url}
              websiteUrl={short.website_url}
              companyType={short.company_type}
              category={short.category}
              size="md"
              className="rounded-lg shadow-2xs"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading font-bold text-base sm:text-xl text-slate-900 truncate">
                  {short.name || 'Company'}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                  {short.category || 'Enterprise'}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                  {short.company_type || 'Dream'}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate hidden sm:block">
                {short.headquarters_address || 'Global Offices'} · {short.employee_size || 'Enterprise Team'}
              </p>
            </div>
          </div>

          {/* Right: Website Button & LinkedIn Button */}
          <div className="flex items-center gap-2 shrink-0">
            {short.website_url && (
              <a
                href={short.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 rounded-lg shadow-2xs transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Website</span>
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-lg shadow-2xs transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Sticky Tab Bar (22 tabs) with auto-center and scroll-spy */}
        <div
          ref={tabListRef}
          className="flex items-center gap-1 px-4 sm:px-6 lg:px-8 overflow-x-auto border-t border-slate-100 bg-[#F8FAFC]/80 no-scrollbar py-1"
        >
          {sections.map((sec, idx) => {
            const isActive = activeSectionIdx === idx;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(idx)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{sec.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Error notification if any */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-900">
                  Database profile synchronization error
                </p>
                <p className="text-[11px] text-red-600">
                  {error?.message || 'Showing cached intelligence data.'}
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

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="w-48 h-6 bg-slate-200 rounded-md" />
                  <div className="w-24 h-5 bg-slate-200 rounded-full" />
                </div>
                <div className="space-y-3">
                  <div className="w-full h-4 bg-slate-100 rounded" />
                  <div className="w-5/6 h-4 bg-slate-100 rounded" />
                  <div className="w-2/3 h-4 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 22 Intelligence Sections in Order */
          sections.map((section, idx) => (
            <SectionCard key={section.id} section={section} index={idx} />
          ))
        )}
      </div>
    </div>
  );
}
