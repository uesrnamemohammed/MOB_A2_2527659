import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, Chip, EmptyState, Screen, s } from '../components/ui';
import { PROJECTS } from '../data/content';
import { ProjectsStackParams } from '../navigation/types';

type Props = NativeStackScreenProps<ProjectsStackParams, 'ProjectsList'>;

export default function ProjectsScreen({ navigation }: Props) {
  return (
    <Screen>
      {PROJECTS.length === 0 && <EmptyState message="No projects to show yet." />}
      {PROJECTS.map((p) => (
        <Pressable key={p.id} accessibilityRole="button" accessibilityLabel={`Open project ${p.title}`} onPress={() => navigation.navigate('ProjectDetails', { projectId: p.id })}>
          <Card>
            <Text style={s.title}>{p.title}</Text>
            <Text style={s.body} numberOfLines={2}>{p.problem}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {p.tech.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </View>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
