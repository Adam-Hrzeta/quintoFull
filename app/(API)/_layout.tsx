import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

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
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />    
      <Tabs.Screen
        name="(locations)"
        options={{
          title: 'Locations',
          tabBarIcon: ({ color }) => <Entypo name="location" size={24} color={color} />,
        }}
      />     
      <Tabs.Screen
        name="(characters)"
        options={{
          title: 'Characters',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />    
      <Tabs.Screen
        name="(episodes)"
        options={{
          title: 'Episodes',
          tabBarIcon: ({ color }) => <MaterialIcons name="tv" size={24} color={color} />,
        }}
      />     
    </Tabs>
  );
}