import React from 'react';
import { Tabs } from 'expo-router';
import { BookOpen, LayoutGrid, ListChecks, Mic, Settings } from 'lucide-react-native';

export default function MobileTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#6A6760',
        tabBarStyle: {
          position: 'absolute',
          bottom: 18,
          left: 16,
          right: 16,
          height: 60,
          borderRadius: 32,
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          borderTopWidth: 1,
          borderColor: 'rgba(28, 28, 26, 0.08)',
          elevation: 0,
        },
        tabBarActiveBackgroundColor: '#1C1C1A',
        tabBarItemStyle: {
          borderRadius: 28,
          margin: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size - 4} />,
        }}
      />
      <Tabs.Screen
        name="rhetoric"
        options={{
          title: 'Rhetoric',
          tabBarIcon: ({ color, size }) => <Mic color={color} size={size - 4} />,
        }}
      />
      <Tabs.Screen
        name="certifications"
        options={{
          title: 'Certifications',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size - 4} />,
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, size }) => <ListChecks color={color} size={size - 4} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size - 4} />,
        }}
      />
    </Tabs>
  );
}
