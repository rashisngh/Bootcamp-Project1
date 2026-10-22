import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CompanyProvider } from './context/CompanyContext';
import { AppLayout } from './components/AppLayout';

// Lazy loaded page components
const Index = lazy(() => import('./pages/Index'));
const CompanyIntelligence = lazy(() => import('./pages/CompanyIntelligence'));
const SkillIntelligence = lazy(() => import('./pages/SkillIntelligence'));
const NotFound = lazy(() => import('./pages/NotFound'));

// QueryClient configuration: staleTime 5min, gcTime 10min, retry 1, refetchOnWindowFocus false
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,    // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Minimal tooltip provider context
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CompanyProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-slate-500 font-medium">
                      Loading Placement Intelligence Hub...
                    </span>
                  </div>
                </div>
              }
            >
              <Routes>
                {/* Home route */}
                <Route path="/" element={<Index />} />

                {/* Nested Company routes */}
                <Route path="/company" element={<AppLayout />}>
                  <Route index element={<Navigate to="intelligence" replace />} />
                  <Route path="intelligence" element={<CompanyIntelligence />} />
                  <Route path="skills" element={<SkillIntelligence />} />
                </Route>

                {/* 404 Wildcard */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
