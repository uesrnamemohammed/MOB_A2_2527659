import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { Card, Chip, Screen, s } from '../components/ui';
import { STUDENT } from '../data/content';
import { useProfile } from '../storage/ProfileContext';

export default function HomeScreen() {
  const { profile } = useProfile();
  return (
    <Screen>
      <Card style={{ alignItems: 'center' }}>
        <Avatar uri={profile.imageUri} />
        <Text accessibilityRole="header" style={{ fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
          My name is {STUDENT.fullName}.
        </Text>
        <Text style={[s.title, { textAlign: 'center' }]}>{profile.headline}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          <Chip label={profile.primarySkill} />
          <Chip label={profile.availability} />
        </View>
      </Card>
      <Card>
        <Text style={s.title}>About me</Text>
        <Text style={s.body}>{profile.bio}</Text>
      </Card>
      <Card>
        <Text style={s.muted}>Verification code</Text>
        <Text style={s.title}>{STUDENT.code}</Text>
      </Card>
    </Screen>
  );
}
