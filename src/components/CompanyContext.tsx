import { createContext, useCallback, useContext, useMemo } from 'react';

// The demo data uses "Friendli" / "friendli" as placeholder tokens. The
// CompanyProvider swaps them for whatever company name the user entered.
const DEFAULT_NAME = 'Friendli';
const DEFAULT_SLUG = 'friendli';

interface CompanyValue {
  name: string;
  slug: string;
}

const CompanyContext = createContext<CompanyValue>({ name: DEFAULT_NAME, slug: DEFAULT_SLUG });

export function slugifyCompany(name: string): string {
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug || DEFAULT_SLUG;
}

export function CompanyProvider({ name, children }: { name: string; children: React.ReactNode }) {
  const value = useMemo<CompanyValue>(() => {
    const trimmed = name.trim() || DEFAULT_NAME;
    return { name: trimmed, slug: slugifyCompany(trimmed) };
  }, [name]);

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export function useCompany(): CompanyValue {
  return useContext(CompanyContext);
}

function brandString(text: string, name: string, slug: string): string {
  return text.replace(/Friendli/g, name).replace(/friendli/g, slug);
}

/** Returns a function that rewrites "Friendli"/"friendli" tokens in a string. */
export function useBrand(): (text: string) => string {
  const { name, slug } = useCompany();
  return useCallback((text: string) => brandString(text, name, slug), [name, slug]);
}

function deepBrandValue(value: unknown, name: string, slug: string): unknown {
  if (typeof value === 'string') return brandString(value, name, slug);
  if (Array.isArray(value)) return value.map(item => deepBrandValue(item, name, slug));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, v]) => [key, deepBrandValue(v, name, slug)]),
    );
  }
  return value;
}

/** Rewrites every "Friendli"/"friendli" token inside a data structure. */
export function useDeepBrand<T>(data: T): T {
  const { name, slug } = useCompany();
  return useMemo(() => deepBrandValue(data, name, slug) as T, [data, name, slug]);
}

export function deepBrand<T>(data: T, name: string, slug: string): T {
  return deepBrandValue(data, name, slug) as T;
}
