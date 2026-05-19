import 'react-native-gesture-handler';
import './src/i18n';

import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Image, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { DataProvider } from './src/context/DataContext';

SplashScreen.preventAutoHideAsync();

function InAppSplash({ onDone }: { onDone: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const hold = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onDone());
    }, 1400);
    return () => clearTimeout(hold);
  }, []);

  return (
    <Animated.View style={[styles.splash, { opacity }]} pointerEvents="none">
      <View style={styles.logoCircle}>
        <Image
          source={require('./assets/logo-white.png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.splashName}>Campedèl-Hof</Text>
      <Text style={styles.splashSub}>Welschnofen · Südtirol</Text>
    </Animated.View>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync().then(() => setReady(true));
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DataProvider>
          <StatusBar style="dark" backgroundColor="#F9F6F3" />
          {ready && <AppNavigator />}
          {ready && !splashDone && <InAppSplash onDone={() => setSplashDone(true)} />}
        </DataProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#83A83D',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  splashLogo: {
    width: 100,
    height: 70,
  },
  splashName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  splashSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 6,
    letterSpacing: 0.2,
  },
});
