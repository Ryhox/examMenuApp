import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Spacing } from '../theme';

interface Props {
  children: React.ReactNode;
}

export default function HorizontalFadeScroll({ children }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      decelerationRate="fast"
      bounces
      alwaysBounceHorizontal
      nestedScrollEnabled
    >
      {children}
      <View style={styles.endSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: Spacing.screen,
    gap: 12,
    paddingBottom: 4,
  },
  endSpacer: {
    width: Spacing.screen,
  },
});
