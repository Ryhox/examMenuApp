import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import DrinksScreen from '../screens/DrinksScreen';
import WineScreen from '../screens/WineScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import * as Haptics from 'expo-haptics';
import { Colors, Radius } from '../theme';

export type RootStackParamList = {
  HomeMain: undefined;
  MenuMain: undefined;
  DrinksMain: undefined;
  WineMain: undefined;
  ItemDetail: {
    itemId: string;
    category: 'menu' | 'drinks' | 'wine';
  };
};

type TabParamList = {
  Home: undefined;
  Menu: undefined;
  Drinks: undefined;
  Wine: undefined;
};

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { default: IoniconName; active: IoniconName }> = {
  Home:   { default: 'home-outline',       active: 'home' },
  Menu:   { default: 'restaurant-outline', active: 'restaurant' },
  Drinks: { default: 'cafe-outline',        active: 'cafe' },
  Wine:   { default: 'wine-outline',        active: 'wine' },
};

const TAB_KEYS: Record<string, string> = {
  Home:   'nav.home',
  Menu:   'nav.menu',
  Drinks: 'nav.drinks',
  Wine:   'nav.wine',
};

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const icons = TAB_ICONS[route.name] ?? { default: 'ellipse-outline', active: 'ellipse' };
        const icon: IoniconName = isFocused ? icons.active : icons.default;
        const label = t(TAB_KEYS[route.name] ?? route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            Haptics.selectionAsync();
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.75}
          >
            <Ionicons
              name={icon}
              size={22}
              color={isFocused ? Colors.accent : Colors.tabInactive}
            />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MODAL_OPTIONS = {
  presentation: 'modal' as const,
  gestureEnabled: true,
  headerShown: false,
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={MODAL_OPTIONS} />
    </Stack.Navigator>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="MenuMain" component={MenuScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={MODAL_OPTIONS} />
    </Stack.Navigator>
  );
}

function DrinksStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="DrinksMain" component={DrinksScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={MODAL_OPTIONS} />
    </Stack.Navigator>
  );
}

function WineStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="WineMain" component={WineScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={MODAL_OPTIONS} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home"   component={HomeStack} />
        <Tab.Screen name="Menu"   component={MenuStack} />
        <Tab.Screen name="Drinks" component={DrinksStack} />
        <Tab.Screen name="Wine"   component={WineStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: 10,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.tabInactive,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: Colors.accent,
    fontWeight: '700',
  },
});
