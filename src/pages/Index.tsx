import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Sparkles, Building2, RotateCcw, AlertTriangle } from 'lucide-react';
import { useCompanies, CompanyCardItem } from '../lib/companyApi';
import { CompanyCard } from '../components/CompanyCard';
import { CategoryType, CATEGORY_COLORS } from '../lib/companyData';

const COLLEGE_NAME = "JSS Academy of Technical Education Noida";
const COLLEGE_SHORT = "JSSATE";

type FilterCategory = 'All' | CategoryType;

const CATEGORIES: FilterCategory[] = ['All', 'Super Dream', 'Dream', 'Standard', 'Regular'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');

  // React Query hook: queries company_json table from Supabase
  const { data: companiesData = [], isLoading, isError, error, refetch } = useCompanies();

  // 200ms debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Live counts for category pills
  const counts = useMemo(() => {
    const map: Record<FilterCategory, number> = {
      All: companiesData.length,
      'Super Dream': 0,
      'Dream': 0,
      'Standard': 0,
      'Regular': 0,
    };
    companiesData.forEach((c) => {
      const type = c.short_json?.company_type as CategoryType;
      if (map[type] !== undefined) {
        map[type]++;
      }
    });
    return map;
  }, [companiesData]);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companiesData.filter((company) => {
      const short = company.short_json || {};
      const matchesCategory =
        selectedCategory === 'All' || short.company_type === selectedCategory;

      const q = debouncedQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        (short.name && short.name.toLowerCase().includes(q)) ||
        (short.short_name && short.short_name.toLowerCase().includes(q)) ||
        (short.category && short.category.toLowerCase().includes(q)) ||
        (short.headquarters_address && short.headquarters_address.toLowerCase().includes(q)) ||
        (short.operating_countries && String(short.operating_countries).toLowerCase().includes(q)) ||
        (short.office_locations && String(short.office_locations).toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [companiesData, debouncedQuery, selectedCategory]);

  const handleReset = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Enterprise Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-xs">
              {COLLEGE_SHORT}
            </div>
            <div>
              <span className="font-heading font-bold text-slate-900 text-base sm:text-lg tracking-tight block leading-tight">
                {COLLEGE_NAME}
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                Placement & Corporate Relations Cell
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Campus Drive 2026-27
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section: Clean white background, bottom border, large heading, small subtitle, search bar directly below */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tag Pill: {COLLEGE_SHORT} · INTELLIGENCE PLATFORM */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-300 mb-5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{COLLEGE_SHORT} · INTELLIGENCE PLATFORM</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            {COLLEGE_NAME} Companies Research & Placement Analytics Portal
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Your strategic edge for campus placements
          </p>

          {/* Search bar directly below */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recruiters by name, technology, headquarters, or location..."
                className="w-full pl-12 pr-11 py-3.5 text-sm sm:text-base bg-white border border-slate-300 rounded-xl shadow-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {debouncedQuery && (
              <p className="text-left text-xs text-slate-500 mt-2 px-1">
                Showing results matching &ldquo;<span className="font-semibold text-slate-700">{debouncedQuery}</span>&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content: Category Filters + Company Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Category Filter Pills with Live Counts */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = counts[cat] || 0;

              let customStyle = {};
              if (cat !== 'All') {
                const conf = CATEGORY_COLORS[cat];
                if (isSelected) {
                  customStyle = {
                    backgroundColor: conf.hex,
                    color: '#ffffff',
                    borderColor: conf.hex,
                  };
                }
              }

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={customStyle}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 border ${
                    isSelected && cat === 'All'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : !isSelected
                      ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      : 'shadow-2xs'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredCompanies.length}</span> verified enterprise{filteredCompanies.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* Error State */}
        {isError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-900">
                  Failed to fetch companies from database
                </p>
                <p className="text-[11px] text-red-600">
                  {error?.message || 'Using local fallback dataset.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                  <div className="w-16 h-5 bg-slate-200 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-3/4 h-5 bg-slate-200 rounded" />
                  <div className="w-1/2 h-3 bg-slate-100 rounded" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="w-full h-3 bg-slate-100 rounded" />
                  <div className="w-2/3 h-3 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          /* Grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.company_id}
                company={{
                  company_id: company.company_id,
                  short_json: company.short_json,
                  summary: company.summary,
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty State with Reset CTA */
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800">
              No matching companies found
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto">
              We couldn&apos;t find any recruiting companies matching your search or category filter.
            </p>
            <button
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <p className="font-medium text-slate-700">
            {COLLEGE_NAME} ({COLLEGE_SHORT}) — Corporate Analytics & Placement Hub
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Designed for JSSATE undergraduate & postgraduate students. Comprehensive corporate intelligence for recruitment preparation.
          </p>
        </div>
      </footer>
    </div>
  );
}
