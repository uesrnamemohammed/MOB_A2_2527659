import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from '../components/Avatar';
import { Button, Card, Screen, SectionTitle, s } from '../components/ui';
import { AVAILABILITY, DEFAULT_PROFILE } from '../data/content';
import { useProfile } from '../storage/ProfileContext';
import { colors } from '../theme';

type Errors = Partial<Record<'headline' | 'bio' | 'primarySkill', string>>;

export default function EditorScreen() {
  const { profile, save, setImage, reset } = useProfile();
  const [headline, setHeadline] = useState(profile.headline);
  const [bio, setBio] = useState(profile.bio);
  const [primarySkill, setPrimarySkill] = useState(profile.primarySkill);
  const [availability, setAvailability] = useState(profile.availability);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState('');
  const [mediaMessage, setMediaMessage] = useState('');

  const validate = (): Errors => {
    const e: Errors = {};
    const h = headline.trim();
    if (h.length < 10) e.headline = 'Headline must be at least 10 characters.';
    else if (h.length > 80) e.headline = 'Headline must be 80 characters or fewer.';
    const b = bio.trim();
    if (b.length < 40) e.bio = 'Biography must be at least 40 characters.';
    else if (b.length > 300) e.bio = 'Biography must be 300 characters or fewer.';
    const k = primarySkill.trim();
    if (!k) e.primarySkill = 'Primary skill is required.';
    else if (!/^[A-Za-z0-9 +#./-]+$/.test(k)) e.primarySkill = 'Primary skill contains invalid characters.';
    return e;
  };

  const onSave = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setMessage('Please fix the errors above. Nothing was saved.');
      return;
    }
    await save({ ...profile, headline: headline.trim(), bio: bio.trim(), primarySkill: primarySkill.trim(), availability });
    setMessage('Profile saved.');
  };

  const onReset = () => {
    Alert.alert('Reset profile', 'Restore default profile data?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await reset();
          setHeadline(DEFAULT_PROFILE.headline);
          setBio(DEFAULT_PROFILE.bio);
          setPrimarySkill(DEFAULT_PROFILE.primarySkill);
          setAvailability(DEFAULT_PROFILE.availability);
          setErrors({});
          setMessage('Profile reset to defaults.');
        },
      },
    ]);
  };

  const pick = async (source: 'camera' | 'gallery') => {
    try {
      if (source === 'camera') {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
          setMediaMessage('Camera permission denied. Enable it in system settings or choose from the gallery.');
          return;
        }
      }
      const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 };
      const result = source === 'camera' ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
      if (result.canceled) {
        setMediaMessage('Selection cancelled. Your current photo is unchanged.');
        return;
      }
      await setImage(result.assets[0].uri);
      setMediaMessage('Profile photo updated.');
    } catch (e) {
      setMediaMessage(`Could not access the photo: ${e instanceof Error ? e.message : 'unknown error'}`);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    borderWidth: 1,
    borderColor: hasError ? colors.error : colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#FFF',
    minHeight: 48,
  });

  return (
    <Screen>
      <SectionTitle>Profile photo</SectionTitle>
      <Card style={{ alignItems: 'center' }}>
        <Avatar uri={profile.imageUri} />
        <View style={{ gap: 8, alignSelf: 'stretch' }}>
          <Button label={profile.imageUri ? 'Replace with camera' : 'Take photo'} onPress={() => pick('camera')} />
          <Button label={profile.imageUri ? 'Replace from gallery' : 'Choose from gallery'} variant="secondary" onPress={() => pick('gallery')} />
          {profile.imageUri ? (
            <Button
              label="Remove photo"
              variant="danger"
              onPress={async () => {
                await setImage('');
                setMediaMessage('Profile photo removed.');
              }}
            />
          ) : null}
        </View>
        {mediaMessage ? <Text style={s.muted}>{mediaMessage}</Text> : null}
      </Card>

      <SectionTitle>Edit profile</SectionTitle>
      <Card>
        <Text style={s.title}>Headline</Text>
        <TextInput accessibilityLabel="Headline" value={headline} onChangeText={setHeadline} style={inputStyle(!!errors.headline)} />
        {errors.headline ? <Text style={{ color: colors.error }}>{errors.headline}</Text> : null}

        <Text style={s.title}>Short biography</Text>
        <TextInput accessibilityLabel="Short biography" value={bio} onChangeText={setBio} multiline style={[inputStyle(!!errors.bio), { minHeight: 110, textAlignVertical: 'top' }]} />
        {errors.bio ? <Text style={{ color: colors.error }}>{errors.bio}</Text> : null}

        <Text style={s.title}>Primary skill</Text>
        <TextInput accessibilityLabel="Primary skill" value={primarySkill} onChangeText={setPrimarySkill} style={inputStyle(!!errors.primarySkill)} />
        {errors.primarySkill ? <Text style={{ color: colors.error }}>{errors.primarySkill}</Text> : null}

        <Text style={s.title}>Availability</Text>
        <View style={{ gap: 8 }}>
          {AVAILABILITY.map((a) => (
            <Button key={a} label={a} variant={availability === a ? 'primary' : 'secondary'} onPress={() => setAvailability(a)} />
          ))}
        </View>
        <Button label="Save profile" onPress={onSave} />
        <Button label="Reset profile" variant="secondary" onPress={onReset} />
        {message ? (
          <Text accessibilityLiveRegion="polite" style={{ color: message.startsWith('Please') ? colors.error : colors.primary, fontWeight: '600' }}>
            {message}
          </Text>
        ) : null}
      </Card>
    </Screen>
  );
}
