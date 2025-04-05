import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="locationsScreen"
        options={{
          title: 'Locations',
          tabBarIcon: ({ color }) => <Entypo name="location" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="locationsScrollScreen"
        options={{
          title: 'Locations con scroll infinito',
          tabBarIcon: ({ color }) => <Entypo name="location" size={24} color="black" />,
        }}
      />
      
    </Tabs>
  );
}
