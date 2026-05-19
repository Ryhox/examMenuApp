import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Spacing, Radius, Colors } from '../theme';

const COPY: Record<string, { title: string; sub: string; badge: string }> = {
  de: { title: 'Herzlich\nWillkommen', sub: 'Entdecken Sie unsere Speisekarte', badge: 'Genuss pur' },
  it: { title: 'Benvenuti\nda noi', sub: 'Scoprite il nostro menù', badge: 'Buon appetito' },
  en: { title: 'Welcome\nto our table', sub: 'Explore our full menu', badge: 'Enjoy' },
};

export default function PromoCard() {
  const { i18n } = useTranslation();
  const { title, sub, badge } = COPY[i18n.language] ?? COPY.de;

  return (
    <ImageBackground
      source={require('../../assets/Hof_22.jpg')}
      style={styles.card}
      imageStyle={{ borderRadius: Radius.xl }}
    >
      {/* Clean elegant dark overlay */}
      <View style={StyleSheet.absoluteFillObject} backgroundColor="rgba(0,0,0,0.45)" borderRadius={Radius.xl} />
      
      <View style={styles.textBlock}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.screen,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
    borderRadius: Radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 24,
    minHeight: 140,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textBlock: {
    flex: 1,
    paddingRight: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent,
    borderRadius: Radius.xl,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 30,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  sub: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
