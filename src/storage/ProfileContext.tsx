import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE } from '../data/content';

export type Profile = typeof DEFAULT_PROFILE;

type Ctx = {
  profile: Profile;
  loaded: boolean;
  save: (p: Profile) => Promise<void>;
  setImage: (uri: string) => Promise<void>;
  reset: () => Promise<void>;
};

const KEY = 'mbaportfolio.profile.v1';
const ProfileCtx = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
      } catch {}
      setLoaded(true);
    })();
  }, []);

  const persist = async (p: Profile) => {
    setProfile(p);
    await AsyncStorage.setItem(KEY, JSON.stringify(p));
  };

  const value: Ctx = {
    profile,
    loaded,
    save: persist,
    setImage: (uri) => persist({ ...profile, imageUri: uri }),
    reset: async () => {
      setProfile(DEFAULT_PROFILE);
      await AsyncStorage.removeItem(KEY);
    },
  };

  return <ProfileCtx.Provider value={value}>{children}</ProfileCtx.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileCtx);
  if (!ctx) throw new Error('ProfileProvider missing');
  return ctx;
}
