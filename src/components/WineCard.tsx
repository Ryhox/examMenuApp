import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ApiWineItem } from '../services/api';
import { resolveImageUrl } from '../services/api';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { formatPrice } from '../utils/formatPrice';
import { Colors, Radius, CARD_WIDTH } from '../theme';

interface Props {
  item: ApiWineItem;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  sectionId?: string;
}

export default function WineCard({ item, navigation }: Props) {
  const imgUri = resolveImageUrl(item.imageUrl);

  const priceEntries = Object.entries(item.prices).filter(([, v]) => v != null) as [string, number][];
  let priceDisplay = '—';
  if (priceEntries.length > 0) {
    const labels: Record<string, string> = { bottle: 'Fl.', glass: 'Gl.', carafe: 'Kf.' };
    priceDisplay = priceEntries
      .map(([k, v]) => `${labels[k] ?? k} ${formatPrice(v)}`)
      .join('  ');
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('ItemDetail', { itemId: item.id, category: 'wine' });
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
          <Ionicons name="wine-outline" size={46} color={Colors.accent} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.subtitle} numberOfLines={1}>{item.winery}</Text>
      <View style={styles.footer}>
        <Text style={styles.price} numberOfLines={1}>{priceDisplay}</Text>
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
    marginBottom: 2,
    minHeight: 38,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.accent,
    textAlign: 'right',
  },
});
