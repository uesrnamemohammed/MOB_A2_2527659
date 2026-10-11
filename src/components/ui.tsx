import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

export function Screen({ children }: { children: ReactNode }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.md, gap: spacing.md }}>
      {children}
    </ScrollView>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <Text accessibilityRole="header" style={s.section}>
      {children}
    </Text>
  );
}

export function Button({ label, onPress, variant = 'primary', disabled }: { label: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'danger'; disabled?: boolean }) {
  const bg = variant === 'primary' ? colors.primary : variant === 'danger' ? colors.error : colors.card;
  const fg = variant === 'secondary' ? colors.primary : '#FFFFFF';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={[s.btn, { backgroundColor: bg, borderColor: variant === 'secondary' ? colors.primary : bg, opacity: disabled ? 0.5 : 1 }]}
    >
      <Text style={[s.btnText, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label }: { label: string }) {
  return (
    <View style={s.chip}>
      <Text style={s.chipText}>{label}</Text>
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <Text style={s.body}>{message}</Text>
    </Card>
  );
}

export const s = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  section: { fontSize: 20, fontWeight: '700', color: colors.primaryDark },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  body: { fontSize: 16, lineHeight: 24, color: colors.text },
  muted: { fontSize: 14, color: colors.muted },
  btn: { minHeight: 48, borderRadius: 10, paddingHorizontal: spacing.md, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  btnText: { fontSize: 16, fontWeight: '600' },
  chip: { backgroundColor: '#E3F0EC', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  chipText: { color: colors.primaryDark, fontSize: 14, fontWeight: '600' },
});
