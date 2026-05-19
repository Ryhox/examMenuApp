import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuItem as MenuItemType } from '../data/types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice } from '../utils/formatPrice';
import AllergenBadges from './AllergenBadges';
import { Colors, Spacing, Radius } from '../theme';

interface Props {
  item: MenuItemType;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function MenuItem({ item, navigation }: Props) {
  const { t } = useTranslation();
  const name = t(item.nameKey);
  const desc = item.descriptionKey ? t(item.descriptionKey) : undefined;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id, category: 'menu' })}
      activeOpacity={0.75}
    >
      <View style={styles.iconBox}>
        <Ionicons
          name={item.isKids ? 'happy-outline' : 'restaurant-outline'}
          size={22}
          color={Colors.accent}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {desc ? <Text style={styles.desc}>{desc}</Text> : null}
        <AllergenBadges allergens={item.allergens} />
      </View>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.screen,
    marginVertical: 5,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentPale,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: 0.1,
  },
  desc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.accent,
    flexShrink: 0,
  },
});
