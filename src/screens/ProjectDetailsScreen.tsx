import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, Chip, EmptyState, Screen, s } from '../components/ui';
import { PROJECTS } from '../data/content';
import { ProjectsStackParams } from '../navigation/types';

type Props = NativeStackScreenProps<ProjectsStackParams, 'ProjectDetails'>;

export default function ProjectDetailsScreen({ route }: Props) {
  const project = PROJECTS.find((p) => p.id === route.params.projectId);
  if (!project) {
    return (
      <Screen>
        <EmptyState message="Project not found." />
      </Screen>
    );
  }
  return (
    <Screen>
      <Card>
        <Text style={s.title}>{project.title}</Text>
      </Card>
      <Card>
        <Text style={s.muted}>Problem</Text>
        <Text style={s.body}>{project.problem}</Text>
      </Card>
      <Card>
        <Text style={s.muted}>My contribution</Text>
        <Text style={s.body}>{project.contribution}</Text>
      </Card>
      <Card>
        <Text style={s.muted}>Technology used</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {project.tech.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </View>
      </Card>
    </Screen>
  );
}
