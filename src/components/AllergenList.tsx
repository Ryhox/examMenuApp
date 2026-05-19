import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { AllergenCode } from '../data/allergens';
import { AllergenLabels } from '../data/allergens';
import { Colors, Spacing } from '../theme';

interface Props {
  allergens: string[];
}

// Extra aliases for names that don't exactly match any label in AllergenLabels
const ALIASES: Record<string, AllergenCode> = {
  dairy: 'G', milk: 'G', latte: 'G',
  gluten: 'A', wheat: 'A',
  eggs: 'C', egg: 'C',
  fish: 'D',
  peanuts: 'E', peanut: 'E',
  soy: 'F', soya: 'F', soia: 'F',
  nuts: 'H', 'tree nuts': 'H',
  celery: 'L',
  mustard: 'M',
  sesame: 'N',
  sulphites: 'O', sulfites: 'O', sulphite: 'O', sulfite: 'O',
  lupin: 'P', lupins: 'P',
  molluscs: 'R', mollusks: 'R',
};

// Resolve raw value (letter code OR any-language name OR alias) to a known AllergenCode
function resolveCode(raw: string): AllergenCode | null {
  const upper = raw.toUpperCase();
  if (AllergenLabels[upper as AllergenCode]) return upper as AllergenCode;
  const lower = raw.toLowerCase();
  if (ALIASES[lower]) return ALIASES[lower];
  const entry = Object.entries(AllergenLabels).find(([, labels]) =>
    Object.values(labels).some(v => v.toLowerCase() === lower)
  );
  return entry ? (entry[0] as AllergenCode) : null;
}

export default function AllergenList({ allergens }: Props) {
  const { t } = useTranslation();

  if (allergens.length === 0) {
    return <Text style={styles.none}>—</Text>;
  }

  return (
    <View style={styles.container}>
      {allergens.map((raw, i) => {
        const code = resolveCode(raw);
        const displayCode = code ?? raw;
        const label = code ? t(`allergen.${code}`) : raw;
        return (
          <View key={i} style={styles.row}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{displayCode}</Text>
            </View>
            <Text style={styles.label}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.allergenBg,
    borderRadius: 4,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.allergenText,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  none: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
