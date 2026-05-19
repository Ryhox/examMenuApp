import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, Radius } from '../theme';

const ALL_LABELS: Record<string, string> = { de: 'Alle', it: 'Tutti', en: 'All' };

interface Pill {
  id: string;
  label: string;
}

interface Props {
  pills: Pill[];
  active: string | null;
  onPress: (id: string | null) => void;
}

export default function FilterPills({ pills, active, onPress }: Props) {
  const { i18n } = useTranslation();
  const allLabel = ALL_LABELS[i18n.language] ?? 'All';

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.scroll}
    >
      <TouchableOpacity
        style={[styles.pill, !active && styles.pillActive]}
        onPress={() => onPress(null)}
        activeOpacity={0.75}
      >
        <Text style={[styles.label, !active && styles.labelActive]}>{allLabel}</Text>
      </TouchableOpacity>
      {pills.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={[styles.pill, active === p.id && styles.pillActive]}
          onPress={() => onPress(p.id)}
          activeOpacity={0.75}
        >
          <Text style={[styles.label, active === p.id && styles.labelActive]}>{p.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.screen,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.accentPale,
    borderColor: Colors.accentPale,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.accent,
    fontWeight: '600',
  },
});
