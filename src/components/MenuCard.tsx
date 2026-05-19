import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuItem } from '../data/types';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice } from '../utils/formatPrice';
import { Colors, Radius } from '../theme';

interface Props {
  item: MenuItem;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function MenuCard({ item, navigation }: Props) {
  const { t } = useTranslation();
  const name = t(item.nameKey);
  const desc = item.descriptionKey ? t(item.descriptionKey) : undefined;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id, category: 'menu' })}
      activeOpacity={0.8}
    >
      <View style={styles.imageArea}>
        <Ionicons
          name={item.isKids ? 'happy-outline' : 'restaurant-outline'}
          size={46}
          color={Colors.accent}
        />
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      {desc ? <Text style={styles.desc} numberOfLines={1}>{desc}</Text> : null}
      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const CARD_WIDTH = 158;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageArea: {
    width: '100%',
    height: 114,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentPale,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 19,
    marginBottom: 3,
    minHeight: 38,
  },
  desc: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
    marginBottom: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.accent,
  },
});
