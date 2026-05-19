import type { DrinkSection } from './types';

export const drinkSections: DrinkSection[] = [
  {
    id: 'hot-drinks',
    titleKey: 'drinks.section.hot',
    items: [
      { id: 'espresso',         nameKey: 'drinks.item.espresso',        prices: 1.80, allergens: [] },
      { id: 'macchiato',        nameKey: 'drinks.item.macchiato',       prices: 1.80, allergens: ['G'] },
      { id: 'doppio',           nameKey: 'drinks.item.doppio',          prices: 3.60, allergens: [] },
      { id: 'cappuccino',       nameKey: 'drinks.item.cappuccino',      prices: 3.00, allergens: ['G'] },
      { id: 'latte-macchiato',  nameKey: 'drinks.item.latteMacchiato',  prices: 3.00, allergens: ['G'] },
      { id: 'heisse-schoko',    nameKey: 'drinks.item.heisseSchoko',    prices: 4.00, allergens: ['G'] },
      { id: 'tee',              nameKey: 'drinks.item.tee',             prices: 3.00, allergens: [] },
    ],
  },
  {
    id: 'soft-drinks',
    titleKey: 'drinks.section.cold',
    items: [
      { id: 'mineralwasser',  nameKey: 'drinks.item.mineralwasser',  prices: { '0.3L': 2.00, '0.5L': 2.50, '1.0L': 5.00 },  allergens: [] },
      { id: 'stilles-wasser', nameKey: 'drinks.item.stillesWasser',  prices: { '0.3L': 2.00, '0.5L': 2.50, '1.0L': 5.00 },  allergens: [] },
      { id: 'apfelsaft',      nameKey: 'drinks.item.apfelsaft',      prices: { '0.3L': 3.00, '0.5L': 5.00, '1.0L': 9.00 },  allergens: [] },
      { id: 'skiwasser',      nameKey: 'drinks.item.skiwasser',      prices: { '0.3L': 3.50, '0.5L': 6.00, '1.0L': 12.00 }, allergens: [] },
      { id: 'himbeersaft',    nameKey: 'drinks.item.himbeersaft',    prices: { '0.3L': 3.00, '0.5L': 5.00, '1.0L': 10.00 }, allergens: [] },
      { id: 'holundersaft',   nameKey: 'drinks.item.holundersaft',   prices: { '0.3L': 3.00, '0.5L': 5.00, '1.0L': 10.00 }, allergens: [] },
      { id: 'melissensaft',   nameKey: 'drinks.item.melissensaft',   prices: { '0.3L': 3.00, '0.5L': 5.00, '1.0L': 10.00 }, allergens: [] },
      { id: 'colasaft',       nameKey: 'drinks.item.colasaft',       prices: { '0.3L': 3.00, '0.5L': 5.00, '1.0L': 10.00 }, allergens: [] },
    ],
  },
  {
    id: 'beer',
    titleKey: 'drinks.section.beer',
    items: [
      { id: 'kronen-forst', nameKey: 'drinks.item.kronenForst', prices: { '0.3L': 3.80, '0.5L': 6.00 }, allergens: ['A'] },
      { id: 'radler',       nameKey: 'drinks.item.radler',      prices: { '0.3L': 3.80, '0.5L': 6.00 }, allergens: ['A'] },
      { id: 'hefeweizen',   nameKey: 'drinks.item.hefeweizen',  prices: { '0.3L': 3.80, '0.5L': 6.00 }, allergens: ['A'] },
      { id: 'alkoholfrei',  nameKey: 'drinks.item.alkoholfrei', prices: { '0.3L': 3.50, '0.5L': 6.00 }, allergens: ['A'] },
    ],
  },
  {
    id: 'aperitif',
    titleKey: 'drinks.section.aperitif',
    items: [
      { id: 'campedeller',    nameKey: 'drinks.item.campedeller',   prices: 5.00,  allergens: ['O'] },
      { id: 'hugo',           nameKey: 'drinks.item.hugo',          prices: 5.00,  allergens: ['O'] },
      { id: 'veneziano',      nameKey: 'drinks.item.veneziano',     prices: 5.00,  allergens: ['O'] },
      { id: 'prosecco',       nameKey: 'drinks.item.prosecco',      prices: 4.00,  allergens: ['O'] },
      { id: 'sanbitter',      nameKey: 'drinks.item.sanbitter',     prices: 4.00,  allergens: [] },
      { id: 'gin-hendricks',  nameKey: 'drinks.item.ginHendricks',  prices: 10.00, allergens: [] },
      { id: 'gin-illusionist',nameKey: 'drinks.item.ginIllusionist',prices: 14.00, allergens: [] },
    ],
  },
  {
    id: 'digestif',
    titleKey: 'drinks.section.digestif',
    items: [
      { id: 'hausschnaps',  nameKey: 'drinks.item.hausschnaps',  prices: 3.50, allergens: [] },
      { id: 'latschen',     nameKey: 'drinks.item.latschen',     prices: 3.50, allergens: [] },
      { id: 'nusseler',     nameKey: 'drinks.item.nusseler',     prices: 3.50, allergens: ['H'] },
      { id: 'zirmschnaps',  nameKey: 'drinks.item.zirmschnaps',  prices: 3.50, allergens: [] },
      { id: 'limoncello',   nameKey: 'drinks.item.limoncello',   prices: 3.50, allergens: ['O'] },
      { id: 'williams',     nameKey: 'drinks.item.williams',     prices: 3.50, allergens: [] },
      { id: 'enzian',       nameKey: 'drinks.item.enzian',       prices: 3.50, allergens: [] },
      { id: 'treber',       nameKey: 'drinks.item.treber',       prices: 3.50, allergens: [] },
      { id: 'heuschnaps',   nameKey: 'drinks.item.heuschnaps',   prices: 3.50, allergens: [] },
      { id: 'branca-menta', nameKey: 'drinks.item.brancaMenta',  prices: 4.00, allergens: [] },
      { id: 'fernet-branca',nameKey: 'drinks.item.fernetBranca', prices: 4.00, allergens: [] },
      { id: 'cynar',        nameKey: 'drinks.item.cynar',        prices: 4.00, allergens: [] },
      { id: 'montenegro',   nameKey: 'drinks.item.montenegro',   prices: 4.00, allergens: [] },
    ],
  },
];
