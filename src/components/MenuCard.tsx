import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ApiMenuItem } from '../services/api';
import { resolveImageUrl, localName } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice } from '../utils/formatPrice';
import { Colors, Radius, CARD_WIDTH } from '../theme';

interface Props {
  item: ApiMenuItem;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  icon?: string;
}

export default function MenuCard({ item, navigation, icon = 'restaurant-outline' }: Props) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const name = localName(item.name, lang);
  const desc = localName(item.description, lang);
  const imgUri = resolveImageUrl(item.imageUrl);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('ItemDetail', { itemId: item.id, category: 'menu' });
      }}
      activeOpacity={0.8}
    >
      <View style={styles.imageArea}>
        {imgUri ? (
          <Image
            source={imgUri}
            style={styles.image}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
          />
        ) : (
          <Ionicons
            name={item.isVegetarian ? 'leaf-outline' : (icon as any)}
            size={46}
            color={Colors.accent}
          />
        )}
        {item.isVegan && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t('badge.vegan')}</Text>
          </View>
        )}
        {!item.isVegan && item.isVegetarian && (
          <View style={[styles.badge, styles.vegBadge]}>
            <Text style={styles.badgeText}>{t('badge.vegetarian')}</Text>
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      {!!desc && <Text style={styles.desc} numberOfLines={1}>{desc}</Text>}
      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

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
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  vegBadge: {
    backgroundColor: '#8BC34A',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
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
