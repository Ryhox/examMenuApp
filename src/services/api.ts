export const BASE_URL = 'https://api-campedel.pokyh.com';

export interface ApiMenuItem {
  id: string;
  name: { de: string; it: string; en: string };
  description: { de: string; it: string; en: string };
  price: number;
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  imageUrl: string | null;
}

export interface ApiMenuSection {
  id: string;
  categoryKey: string;
  icon: string;
  gradientStart: string;
  gradientEnd: string;
  items: ApiMenuItem[];
}

export interface ApiDrinkItem {
  id: string;
  name: { de: string; it: string; en: string };
  prices: any;
  imageUrl: string | null;
}

export interface ApiDrinkSection {
  id: string;
  categoryKey: string;
  icon: string;
  items: ApiDrinkItem[];
}

export interface ApiWineItem {
  id: string;
  name: string;
  winery: string;
  region: string;
  doc: string;
  dryness: string;
  grapes: string[];
  description: { de: string; it: string; en: string };
  prices: {
    bottle?: number;
    glass?: number;
    carafe?: number;
  };
  imageUrl: string | null;
}

export interface ApiWineSection {
  id: string;
  category: string;
  wines: ApiWineItem[];
}

export interface PriceEntry {
  label: string;
  price: number;
}

export function resolveImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
}

export function localName(
  name: { de?: string; it?: string; en?: string } | string | undefined,
  lang: string,
): string {
  if (!name) return '';
  if (typeof name === 'string') return name;
  return (name as any)[lang] || name.de || name.it || name.en || '';
}

export function parseDrinkPrices(raw: any): PriceEntry[] {
  if (raw === null || raw === undefined) return [];

  if (Array.isArray(raw)) {
    if (raw.length === 0) return [];
    const first = raw[0];
    if (first !== null && typeof first === 'object' && 'price' in first) {
      return raw.map(r => ({ label: String(r.label ?? r.amount ?? ''), price: Number(r.price ?? 0) }));
    }
    if (typeof first === 'number') {
      return raw.map((p: number) => ({ label: '', price: p }));
    }
    return [];
  }

  if (typeof raw === 'number') {
    return [{ label: '', price: raw }];
  }

  if (typeof raw === 'string' && raw.trim() !== '' && !isNaN(Number(raw))) {
    return [{ label: '', price: Number(raw) }];
  }

  if (typeof raw === 'object') {
    return Object.entries(raw).map(([k, v]) => ({ label: k, price: Number(v) }));
  }

  return [];
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const fetchMenu = () => apiFetch<ApiMenuSection[]>('/api/menu');
export const fetchDrinks = () => apiFetch<ApiDrinkSection[]>('/api/drinks');
export const fetchWines = () => apiFetch<ApiWineSection[]>('/api/wines');
