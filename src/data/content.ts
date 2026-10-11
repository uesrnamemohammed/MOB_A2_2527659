export const STUDENT = {
  fullName: 'Mohammed Bashier Ahmed',
  regNumber: '25/27659',
  appName: 'MBAPortfolio',
  code: 'MOB-A2-7659',
  version: '1.0.0',
};

export const DEFAULT_PROFILE = {
  headline: 'Software Engineering Student | Mobile & Web Developer',
  bio: 'I am a university student at INES-Ruhengeri building practical mobile and web applications with a focus on clean interfaces and reliable data handling.',
  primarySkill: 'Mobile Development',
  availability: 'Open to internships',
  imageUri: '',
};

export const AVAILABILITY = ['Open to internships', 'Open to projects', 'Not available'];

export type Skill = { name: string; level: string };

export const SKILLS: Skill[] = [
  { name: 'Java', level: 'Intermediate' },
  { name: 'Web Development', level: 'Intermediate' },
  { name: 'UI/UX Design', level: 'Intermediate' },
  { name: 'Data Management', level: 'Intermediate' },
  { name: 'React Native', level: 'Beginner' },
];

export const EDUCATION = [
  { period: '2025 - Present', title: 'Bachelor studies, INES-Ruhengeri', detail: 'Software engineering coursework including mobile application development.' },
  { period: '2026', title: 'SWE 3409 Mobile Application Development', detail: 'React Native, Expo, navigation, storage and Android packaging.' },
];

export type Project = {
  id: string;
  title: string;
  problem: string;
  contribution: string;
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'MBAPortfolio Mobile App',
    problem: 'Recruiters need to understand a student profile quickly without a paper CV.',
    contribution: 'Designed the screens, built the navigation, profile editor with validation, image selection and local storage.',
    tech: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage'],
  },
  {
    id: 'p2',
    title: 'Course Data Management Application',
    problem: 'Course records were hard to organise and search.',
    contribution: 'Modelled the data, wrote the input forms and the query logic for the class project.',
    tech: ['Java', 'Database design'],
  },
];
