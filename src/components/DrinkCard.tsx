import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ApiDrinkItem } from '../services/api';
import { resolveImageUrl, localName, parseDrinkPrices } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice } from '../utils/formatPrice';
import { Colors, Radius, CARD_WIDTH } from '../theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const SECTION_ICONS: Record<string, IoniconName> = {
  'hot-drinks': 'cafe-outline',
  'soft-drinks': 'water-outline',
  'beer': 'beer-outline',
  'aperitif': 'wine-outline',
  'digestif': 'flask-outline',
};

interface Props {
  item: ApiDrinkItem;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  sectionId?: string;
  sectionIcon?: string;
}

export default function DrinkCard({ item, navigation, sectionId, sectionIcon }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const name = localName(item.name, lang);
  const imgUri = resolveImageUrl(item.imageUrl);
  const iconName: IoniconName =
    (sectionId ? SECTION_ICONS[sectionId] : undefined) ??
    (sectionIcon as IoniconName | undefined) ??
    'cafe-outline';

  const prices = parseDrinkPrices(item.prices);
  let priceDisplay: string;
  if (prices.length === 0) {
    priceDisplay = '—';
  } else if (prices.length === 1) {
    priceDisplay = formatPrice(prices[0].price);
  } else {
    const min = Math.min(...prices.map(p => p.price));
    priceDisplay = `ab ${formatPrice(min)}`;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('ItemDetail', { itemId: item.id, category: 'drinks' });
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
          <Ionicons name={iconName} size={46} color={Colors.accent} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{priceDisplay}</Text>
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
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 19,
    marginBottom: 3,
    minHeight: 38,
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
