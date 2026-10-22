import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SEED_COMPANIES, SeedCompany } from '../data/seedCompanies';

export interface ActiveCompany {
  company_id: number;
  short_json: any;
  full_json?: Record<string, any>;
  skill_levels?: any[];
}

export interface PersistedCompany {
  companyId: number;
  companyName: string;
  logoUrl: string;
  short_json?: any;
}

interface CompanyContextType {
  selectedCompany: ActiveCompany | null;
  selectCompany: (company: ActiveCompany | { company_id: number; short_json: any; full_json?: any }) => void;
  isLoading: boolean;
}

const LOCAL_STORAGE_KEY = 'selected-company';

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<ActiveCompany | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: PersistedCompany = JSON.parse(stored);
        const match = SEED_COMPANIES.find(
          (c) => c.company_id === parsed.companyId || c.short_json.name === parsed.companyName
        );

        if (match) {
          setSelectedCompany(match);
        } else if (parsed.companyId) {
          // Restore company object from localStorage even if not in hardcoded seed
          setSelectedCompany({
            company_id: parsed.companyId,
            short_json: parsed.short_json || {
              name: parsed.companyName,
              short_name: parsed.companyName,
              logo_url: parsed.logoUrl,
              company_type: 'Dream',
              category: 'Enterprise',
            },
          });
        } else if (SEED_COMPANIES.length > 0) {
          setSelectedCompany(SEED_COMPANIES[0]);
        }
      } else if (SEED_COMPANIES.length > 0) {
        // Initialize default
        setSelectedCompany(SEED_COMPANIES[0]);
        const def = SEED_COMPANIES[0];
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            companyId: def.company_id,
            companyName: def.short_json.name,
            logoUrl: def.short_json.logo_url,
            short_json: def.short_json,
          })
        );
      }
    } catch (err) {
      console.error('[CompanyContext] Failed to parse selected-company from localStorage', err);
      if (SEED_COMPANIES.length > 0) {
        setSelectedCompany(SEED_COMPANIES[0]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectCompany = (
    company: ActiveCompany | { company_id: number; short_json: any; full_json?: any }
  ) => {
    setSelectedCompany(company);
    const toPersist: PersistedCompany = {
      companyId: company.company_id,
      companyName: company.short_json?.name || 'Company',
      logoUrl: company.short_json?.logo_url || '',
      short_json: company.short_json,
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toPersist));
    } catch (e) {
      console.error('[CompanyContext] Failed to write selected-company to localStorage', e);
    }
  };

  return (
    <CompanyContext.Provider value={{ selectedCompany, selectCompany, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany(): CompanyContextType {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
