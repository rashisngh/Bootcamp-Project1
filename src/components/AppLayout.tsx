import React, { useState } from 'react';
import { Outlet, useLocation, Link, Navigate } from 'react-router-dom';
import { Menu, ChevronRight, Home, Building2, ExternalLink } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { useCompany } from '../context/CompanyContext';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { selectedCompany, isLoading } = useCompany();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading intelligence data...</p>
        </div>
      </div>
    );
  }

  // Route Guard: If selected-company is missing, redirect to home "/"
  if (!selectedCompany) {
    return <Navigate to="/" replace />;
  }

  const isSkillsPage = location.pathname.includes('/skills');
  const activeSectionTitle = isSkillsPage ? 'Skill Intelligence' : 'Company Intelligence';

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <AppSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Header with Breadcrumbs & Mobile Trigger */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 min-w-0">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-blue-600 font-medium transition-colors shrink-0"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Portal</span>
              </Link>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              <span className="font-semibold text-slate-800 truncate max-w-[140px] sm:max-w-[240px]">
                {selectedCompany.short_json.name}
              </span>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              <span className="text-blue-600 font-medium shrink-0">
                {activeSectionTitle}
              </span>
            </nav>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              Browse Companies
            </Link>
          </div>
        </header>

        {/* Routed Sub-pages */}
        <main className="flex-1 min-w-0 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
