export type AllergenCode =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  | 'H' | 'L' | 'M' | 'N' | 'O' | 'P' | 'R';

export const AllergenLabels: Record<AllergenCode, { de: string; it: string; en: string }> = {
  A: { de: 'Gluten',       it: 'Glutine',          en: 'Gluten' },
  B: { de: 'Krebstiere',   it: 'Crostacei',        en: 'Crustaceans' },
  C: { de: 'Eier',         it: 'Uova',             en: 'Eggs' },
  D: { de: 'Fisch',        it: 'Pesce',            en: 'Fish' },
  E: { de: 'Erdnüsse',     it: 'Arachidi',         en: 'Peanuts' },
  F: { de: 'Soja',         it: 'Soia',             en: 'Soy' },
  G: { de: 'Milch',        it: 'Latte',            en: 'Milk' },
  H: { de: 'Nüsse',        it: 'Frutta a guscio',  en: 'Tree nuts' },
  L: { de: 'Sellerie',     it: 'Sedano',           en: 'Celery' },
  M: { de: 'Senf',         it: 'Senape',           en: 'Mustard' },
  N: { de: 'Sesam',        it: 'Sesamo',           en: 'Sesame' },
  O: { de: 'Sulfite',      it: 'Solfiti',          en: 'Sulphites' },
  P: { de: 'Lupinen',      it: 'Lupini',           en: 'Lupin' },
  R: { de: 'Weichtiere',   it: 'Molluschi',        en: 'Molluscs' },
};
