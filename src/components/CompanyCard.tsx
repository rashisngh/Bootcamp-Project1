import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { SeedCompany } from '../data/seedCompanies';
import { useCompany } from '../context/CompanyContext';
import { CompanyLogo } from './CompanyLogo';
import { CATEGORY_COLORS, isNullish, CategoryType } from '../lib/companyData';

export interface CompanyCardData {
  company_id: number;
  short_json: any;
  summary?: any;
  full_json?: any;
  skill_levels?: any[];
}

interface CompanyCardProps {
  company: CompanyCardData;
}

export const CompanyCard = memo(function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();
  const { selectCompany } = useCompany();
  const { short_json } = company;

  const handleClick = () => {
    // 1. Save selected-company to localStorage and update CompanyContext
    selectCompany(company);
    // 2. Navigate to /company/intelligence
    navigate('/company/intelligence');
  };

  const categoryConfig =
    CATEGORY_COLORS[short_json.company_type as CategoryType] || CATEGORY_COLORS.Dream;
  const isNegativeGrowth = short_json.yoy_growth_rate?.startsWith('-');

  const formatText = (text?: string, fallback: string = 'not publicly available') => {
    if (isNullish(text)) {
      return <span className="italic text-slate-400 font-normal">{fallback}</span>;
    }
    return text;
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="group relative flex flex-col justify-between bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 rounded-xl p-5 text-left cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500"
    >
      <div>
        {/* Header: Logo & Category badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <CompanyLogo
            name={short_json.name}
            logoUrl={short_json.logo_url}
            websiteUrl={short_json.website_url}
            companyType={short_json.company_type}
            category={short_json.category}
            size="lg"
            className="rounded-lg shadow-2xs"
          />
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border shadow-2xs"
            style={{
              backgroundColor: `${categoryConfig.hex}15`,
              color: categoryConfig.hex,
              borderColor: `${categoryConfig.hex}30`,
            }}
          >
            {short_json.company_type}
          </span>
        </div>

        {/* Company Title & Category */}
        <div className="mb-4">
          <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {short_json.short_name || short_json.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
            {short_json.name !== short_json.short_name ? short_json.name : short_json.category}
          </p>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 text-xs text-slate-600 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{formatText(short_json.headquarters_address)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{formatText(short_json.employee_size)}</span>
          </div>

          <div className="flex items-center gap-2">
            {isNegativeGrowth ? (
              <TrendingDown className="w-3.5 h-3.5 text-red-500 shrink-0" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            )}
            <span
              className={`font-semibold ${
                isNegativeGrowth ? 'text-red-600' : 'text-emerald-700'
              }`}
            >
              {short_json.yoy_growth_rate || 'N/A'} YoY Growth
            </span>
          </div>
        </div>
      </div>

      {/* Footer link CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-medium">
        <span className="text-slate-500 group-hover:text-blue-600 transition-colors">
          View Intelligence Hub
        </span>
        <div className="p-1 rounded-full bg-slate-50 group-hover:bg-blue-50 group-hover:translate-x-0.5 transition-all text-slate-400 group-hover:text-blue-600">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
});
