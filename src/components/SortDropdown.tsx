import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, Radius } from '../theme';

interface Option {
  id: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}

export default function SortDropdown({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const current = options.find(o => o.id === value) ?? options[0];

  const toggle = () => {
    Haptics.selectionAsync();
    setOpen(v => !v);
  };

  const select = (id: string) => {
    Haptics.selectionAsync();
    onChange(id);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {open && <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />}

      <TouchableOpacity
        style={[styles.trigger, open && styles.triggerActive]}
        onPress={toggle}
        activeOpacity={0.75}
      >
        <Ionicons name="funnel-outline" size={13} color={open ? Colors.accent : Colors.textSecondary} />
        <Text style={[styles.triggerText, open && styles.triggerTextActive]}>{current.label}</Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={13}
          color={open ? Colors.accent : Colors.textSecondary}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map((opt, i) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.option, i < options.length - 1 && styles.optionDivider]}
              onPress={() => select(opt.id)}
              activeOpacity={0.75}
            >
              <Text style={[styles.optionText, opt.id === value && styles.optionTextActive]}>
                {opt.label}
              </Text>
              {opt.id === value && (
                <Ionicons name="checkmark" size={14} color={Colors.accent} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    zIndex: 100,
  },
  backdrop: {
    position: 'absolute',
    top: -400,
    bottom: -2000,
    left: -600,
    right: -600,
    zIndex: 0,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 5,
    zIndex: 1,
  },
  triggerActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentPale,
  },
  triggerText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  triggerTextActive: {
    color: Colors.accent,
    fontWeight: '600',
  },
  dropdown: {
    position: 'absolute',
    top: 38,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 12,
    minWidth: 150,
    zIndex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  optionText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  optionTextActive: {
    color: Colors.accent,
    fontWeight: '600',
  },
});
