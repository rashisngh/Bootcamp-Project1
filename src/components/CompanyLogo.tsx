import React, { useState } from 'react';

interface CompanyLogoProps {
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  companyType?: string;
  category?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs rounded-md',
  md: 'w-10 h-10 text-base rounded-lg',
  lg: 'w-12 h-12 text-lg rounded-xl',
  xl: 'w-16 h-16 text-2xl rounded-2xl',
};

// Brand kit palette aligned with portal tokens
const BRAND_KIT_MAP: Record<string, { hex: string; border: string }> = {
  'Super Dream': { hex: '#7C3AED', border: '#6D28D9' },
  'Dream': { hex: '#2563EB', border: '#1D4ED8' },
  'Standard': { hex: '#16A34A', border: '#15803D' },
  'Regular': { hex: '#D97706', border: '#B45309' },
};

const BRAND_PALETTE = [
  { hex: '#2563EB', border: '#1D4ED8' }, // Dream Blue
  { hex: '#7C3AED', border: '#6D28D9' }, // Super Dream Purple
  { hex: '#16A34A', border: '#15803D' }, // Standard Green
  { hex: '#D97706', border: '#B45309' }, // Regular Amber
  { hex: '#0284C7', border: '#0369A1' }, // Sky Blue
  { hex: '#4F46E5', border: '#4338CA' }, // Indigo
  { hex: '#0D9488', border: '#0F766E' }, // Teal
  { hex: '#E11D48', border: '#BE123C' }, // Rose
];

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  logoUrl,
  websiteUrl,
  companyType,
  category,
  className = '',
  size = 'md',
}) => {
  const [errorCount, setErrorCount] = useState<number>(0);

  // Check optional Logo.dev publishable key
  const logoDevKey = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY;

  let computedUrl: string | undefined = undefined;

  // Domain extraction helper
  const getDomain = (url?: string) => {
    if (!url) return '';
    try {
      const u = new URL(url.startsWith('http') ? url : `https://${url}`);
      return u.hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const domain = getDomain(websiteUrl);

  if (errorCount === 0 && logoDevKey && domain) {
    computedUrl = `https://img.logo.dev/${domain}?token=${logoDevKey}`;
  } else if (errorCount <= 1 && logoUrl && logoUrl.trim() !== '' && logoUrl.trim().toLowerCase() !== 'na' && logoUrl.trim().toLowerCase() !== 'none') {
    computedUrl = logoUrl;
  }

  // First alphabet of company name in capital letter
  const cleanName = (name || '').trim();
  const initial = cleanName ? cleanName.charAt(0).toUpperCase() : 'C';

  // Determine brand kit related color
  const getBrandColor = () => {
    if (companyType && BRAND_KIT_MAP[companyType]) {
      return BRAND_KIT_MAP[companyType];
    }
    if (category && BRAND_KIT_MAP[category]) {
      return BRAND_KIT_MAP[category];
    }
    // Deterministic hash based on company name
    let hash = 0;
    for (let i = 0; i < cleanName.length; i++) {
      hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % BRAND_PALETTE.length;
    return BRAND_PALETTE[idx];
  };

  const brand = getBrandColor();

  const handleImgError = () => {
    setErrorCount((prev) => prev + 1);
  };

  // Render branded initial fallback when no logo or on image error
  if (!computedUrl || errorCount > 1) {
    return (
      <div
        className={`flex items-center justify-center font-heading font-extrabold text-white shrink-0 select-none shadow-xs border ${sizeClasses[size]} ${className}`}
        style={{
          backgroundColor: brand.hex,
          borderColor: brand.border,
        }}
        aria-label={`${name} logo (${initial})`}
      >
        <span className="leading-none drop-shadow-xs">{initial}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-white border border-slate-200 overflow-hidden shrink-0 shadow-xs p-1 ${sizeClasses[size]} ${className}`}
    >
      <img
        src={computedUrl}
        alt={`${name} logo`}
        className="w-full h-full object-contain"
        onError={handleImgError}
        loading="lazy"
      />
    </div>
  );
};
