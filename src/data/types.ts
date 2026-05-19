import type { AllergenCode } from './allergens';

export interface PriceVariants {
  '0.25L'?: number;
  '0.3L'?: number;
  '0.5L'?: number;
  '0.75L'?: number;
  '1.0L'?: number;
  glass?: number;
}

export interface MenuItem {
  id: string;
  nameKey: string;
  descriptionKey?: string;
  price: number;
  allergens: AllergenCode[];
  isKids?: boolean;
}

export interface MenuSection {
  id: string;
  titleKey: string;
  items: MenuItem[];
}

export interface WineItem {
  id: string;
  nameKey: string;
  producer: string;
  appellation: string;
  prices: PriceVariants;
  allergens: AllergenCode[];
}

export interface WineSection {
  id: string;
  titleKey: string;
  items: WineItem[];
}

export interface DrinkItem {
  id: string;
  nameKey: string;
  prices: PriceVariants | number;
  allergens: AllergenCode[];
}

export interface DrinkSection {
  id: string;
  titleKey: string;
  items: DrinkItem[];
}
