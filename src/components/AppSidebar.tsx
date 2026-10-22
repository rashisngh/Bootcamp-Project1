import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Building2, Sparkles, LayoutGrid, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { useCompany } from '../context/CompanyContext';

interface AppSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { selectedCompany } = useCompany();

  const navItems = [
    {
      name: 'Company Intelligence',
      path: '/company/intelligence',
      icon: Building2,
      badge: '22 Sections',
    },
    {
      name: 'Skill Intelligence',
      path: '/company/skills',
      icon: Sparkles,
      badge: '12 Skills',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#F8FAFC] border-r border-[#E5E7EB] transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E7EB] shrink-0">
          {!collapsed ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                JSS
              </div>
              <div className="flex flex-col truncate">
                <span className="font-heading font-bold text-slate-900 text-sm leading-tight truncate">
                  JSSATE Noida
                </span>
                <span className="text-[10px] font-medium text-blue-600 tracking-wider uppercase">
                  Intelligence Hub
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                JSS
              </div>
            </div>
          )}

          {/* Collapse Toggle (Desktop) */}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Selected Company Mini-Pill (when sidebar expanded) */}
        {!collapsed && selectedCompany && (
          <div className="px-4 py-3 border-b border-[#E5E7EB] bg-white/60">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Active Company
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-heading font-semibold text-xs text-slate-800 truncate">
                {selectedCompany.short_json.name}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Analytics Modules
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold shadow-2xs'
                      : 'text-[#334155] hover:bg-slate-200/50 hover:text-slate-900'
                  } ${collapsed ? 'justify-center' : ''}`
                }
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <div className="flex items-center justify-between w-full overflow-hidden">
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer: All Companies link */}
        <div className="p-3 border-t border-[#E5E7EB] shrink-0 bg-white/40">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="All Companies"
          >
            <LayoutGrid className="w-4 h-4 shrink-0 text-slate-500" />
            {!collapsed && <span className="truncate font-semibold">All Companies</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};
