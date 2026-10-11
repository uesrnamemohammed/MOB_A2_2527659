My name is Mohammed Bashier Ahmed.

- Registration number: 25/27659
- App name: MBAPortfolio
- Verification code: MOB-A2-7659
- Android package: rw.ac.ines.ug2527659.mbaportfolio

## Purpose
A personal portfolio app that introduces the student to a recruiter offline, with an editable profile, skills, projects and a profile photo.

## Features
- Home with the "My name is..." statement, avatar, headline, biography and verification code
- Skills and education timeline
- Projects list with a separate Project Details stack screen
- Profile editor with controlled fields, three validation rules and field-level messages
- Profile photo from camera or gallery with preview, replace, remove, permission and cancellation feedback
- AsyncStorage persistence with reset
- Fully offline; About screen with release information and data-use statement

## Setup and run
```
npm install
npx expo install --fix
npx expo start
```

## EAS build command
```
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

## Release details
- Tested device: Samsung Galaxy A14 (SM-A145P)
- Android version: 15
- Final commit hash: FINAL_COMMIT_HASH
- Release link: https://github.com/uesrnamemohammed/MOB_A2_2527659/releases/tag/v1.0.0
- APK link: https://github.com/uesrnamemohammed/MOB_A2_2527659/releases/download/v1.0.0/MOB_A2_2527659.apk

## Known limitations
- Content is stored locally only and is not synchronised
- Optional links are not used, so no feature requires a connection
