import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function AboutScreen() {
  const { actualTheme } = useTheme();
  const isDark = actualTheme === 'dark';

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: isDark ? '#0F172A' : '#F9FAFB',
      }}
    >
      <Text style={{ color: isDark ? '#F8FAFC' : '#0F172A', fontSize: 24, fontWeight: 'bold' }}>
        FlashMob
      </Text>

      <Text style={{ color: isDark ? '#CBD5E1' : '#64748B', marginBottom: 15 }}>
        Version 1.0.0
      </Text>

      <Text style={{ color: isDark ? '#F8FAFC' : '#0F172A', fontSize: 16, marginBottom: 10 }}>
        Converts study notes into flashcards instantly and offline.
      </Text>

      <Text style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>• Rule-based generation</Text>
      <Text style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>• LaTeX math support</Text>
      <Text style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>• Fast &amp; offline</Text>
    </View>
  );
}