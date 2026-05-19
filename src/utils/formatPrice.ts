import type { PriceVariants } from '../data/types';

export function formatPrice(price: number): string {
  return price.toFixed(2).replace('.', ',') + ' €';
}

export function formatPriceVariants(
  prices: PriceVariants | Record<string, number>,
  glassLabel: string,
): string {
  return Object.entries(prices)
    .filter(([, v]) => v !== undefined)
    .map(([size, price]) => {
      const label = size === 'glass' ? glassLabel : size;
      return `${label} ${formatPrice(price as number)}`;
    })
    .join('  ·  ');
}
