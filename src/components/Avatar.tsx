import React from 'react';
import { Image, Text, View } from 'react-native';
import { colors } from '../theme';

export function Avatar({ uri, size = 120 }: { uri: string; size?: number }) {
  if (uri) {
    return <Image accessibilityLabel="Profile photo" source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
  }
  return (
    <View accessibilityLabel="Profile avatar" style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#FFF', fontSize: size / 3, fontWeight: '700' }}>MBA</Text>
    </View>
  );
}
