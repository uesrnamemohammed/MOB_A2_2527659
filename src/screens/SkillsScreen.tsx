import React from 'react';
import { Text } from 'react-native';
import { Card, Screen, SectionTitle, s } from '../components/ui';
import { EDUCATION, SKILLS } from '../data/content';

export default function SkillsScreen() {
  return (
    <Screen>
      <SectionTitle>Skills</SectionTitle>
      {SKILLS.map((k) => (
        <Card key={k.name} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[s.title, { flexShrink: 1 }]}>{k.name}</Text>
          <Text style={s.muted}>{k.level}</Text>
        </Card>
      ))}
      <SectionTitle>Education and training</SectionTitle>
      {EDUCATION.map((e) => (
        <Card key={e.title}>
          <Text style={s.muted}>{e.period}</Text>
          <Text style={s.title}>{e.title}</Text>
          <Text style={s.body}>{e.detail}</Text>
        </Card>
      ))}
    </Screen>
  );
}
