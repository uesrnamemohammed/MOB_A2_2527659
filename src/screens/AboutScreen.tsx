import React from 'react';
import { Text } from 'react-native';
import { Card, Screen, s } from '../components/ui';
import { STUDENT } from '../data/content';

export default function AboutScreen() {
  const rows: [string, string][] = [
    ['App name', STUDENT.appName],
    ['Student name', STUDENT.fullName],
    ['Registration number', STUDENT.regNumber],
    ['Verification code', STUDENT.code],
    ['Version', STUDENT.version],
  ];
  return (
    <Screen>
      <Card>
        {rows.map(([k, v]) => (
          <Text key={k} style={s.body}>
            <Text style={{ fontWeight: '700' }}>{k}: </Text>
            {v}
          </Text>
        ))}
      </Card>
      <Card>
        <Text style={s.title}>Data use</Text>
        <Text style={s.body}>This app stores only your editable profile text and the local reference of your chosen photo on this device using AsyncStorage. No data is sent anywhere. The app works fully offline and contains no features that need a connection.</Text>
      </Card>
    </Screen>
  );
}
