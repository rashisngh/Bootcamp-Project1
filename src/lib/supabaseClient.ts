import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function sanitizeSupabaseUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If user pasted a postgresql connection string, e.g. postgresql://postgres.igneltvsslosdulbkrxm:...
  if (trimmed.startsWith('postgresql://') || trimmed.startsWith('postgres://')) {
    const match = trimmed.match(/postgres\.([a-z0-9_-]+):/i);
    if (match && match[1]) {
      return `https://${match[1]}.supabase.co`;
    }
  }

  // If already http or https
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // If bare ref or domain
  if (trimmed.includes('.supabase.co')) {
    return `https://${trimmed}`;
  }

  return `https://${trimmed}.supabase.co`;
}

export const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
export const supabaseAnonKey = rawAnonKey?.trim() || '';

if (!supabaseUrl) {
  console.error(
    '[SupabaseClient] Missing VITE_SUPABASE_URL! Please set VITE_SUPABASE_URL in your .env file.'
  );
}

if (!supabaseAnonKey) {
  console.error(
    '[SupabaseClient] Missing VITE_SUPABASE_ANON_KEY! Please set VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
