# AFeeree Certification Program

A mobile app for dancers and teachers participating in the AFeeree Dance Certification Program. This app supports in-class sessions, allows participants to submit assignments, and track their certification progress.

## Access Control

This app uses an **access code system** instead of app store payments. Users must enter a valid access code to use the app.

### How it works:
1. Participants receive an access code from the program administrator
2. They enter the code on the access screen when first opening the app
3. Once verified, they can complete onboarding and use all app features

### Managing Access Codes:
Access codes are defined in `src/lib/userStore.ts` in the `VALID_ACCESS_CODES` object:
- Set expiration to `null` for codes that never expire
- Set a date string like `'2025-12-31'` for codes that expire

**Current valid codes:**
- `AFEEREE2024`
- `PROGRAM2024`
- `CERTIFICATION`
- `BAKARI2024`

To add new codes, edit the `VALID_ACCESS_CODES` object in `src/lib/userStore.ts`.

## Features

### Home Dashboard
- Welcome screen with personalized greeting
- Overall certification progress overview
- Quick stats (pending assignments)
- Continue learning section with current module
- Upcoming assignments preview
- Director & Legacy Keeper biography section for BaKari IfaSegun Lindsay
- Pull-to-refresh functionality
- Haptic feedback on all interactions

### Onboarding
- Beautiful two-step welcome flow for new users
- Collects name and email
- Sets enrollment date automatically
- Animated transitions between steps

### Access Code Screen
- Secure entry point for program participants
- Validates access codes against approved list
- Shake animation and haptic feedback on invalid codes
- Redirects to onboarding after successful verification

### Syllabus
- Browse all certification modules
- Filter by category (Technique, Theory, Teaching Practice, Research)
- Track progress for each module
- Locked/unlocked module states
- Video demonstration links
- View full syllabus PDF
- **Mandinka Terms** - Vocabulary reference with pronunciation
- **Practice Timer** - Track your practice sessions
- Pull-to-refresh and haptic feedback

### Module Detail
- View full module description and notation references
- **Mark lessons as complete** with persistent progress tracking
- **Notes feature** - Take personal notes for each module
- **Confetti celebration** when completing all lessons
- View PDF resources
- Progress bar showing completion status

### Assignments
- View all assignments with status filters
- Submit teaching practice videos
- Upload documents and reflections
- View grades and instructor feedback
- Multiple submission types (video, document, reflection)
- Pull-to-refresh and haptic feedback

### Profile
- View certification progress based on completed lessons
- Account information (name, email, enrollment date)
- Upload/change profile photo
- **Dark mode toggle** - Switch between light and dark themes
- Achievement stats (lessons completed, modules finished, assignments graded)
- **Achievements system** with progress tracking:
  - First Steps - Complete your first lesson
  - Dedicated Learner - Complete 10 lessons
  - Module Master - Complete your first module
  - Assignment Ace - Submit 5 assignments
  - On Fire - Study 7 days in a row
  - Certification Ready - Complete all requirements
- Pull-to-refresh and haptic feedback

### Feedback
- Two-way messaging between instructor and participants
- View all participants with their progress
- Send personalized feedback to each participant
- Participants can respond to feedback
- Message history with timestamps
- Real-time conversation view

## UX Enhancements

- **Haptic Feedback**: Light vibrations on all button taps for native feel
- **Pull-to-Refresh**: Swipe down on any screen to refresh content
- **Micro-interactions**: Button press animations with scale effects
- **Smooth Animations**: Fade-in and slide animations throughout
- **Confetti Celebration**: Animated confetti when completing a module
- **Skeleton Loading**: Placeholder UI while content loads
- **Persistent State**: All progress saved locally with Zustand & AsyncStorage

## Tech Stack

- Expo SDK 53 with React Native
- NativeWind (Tailwind CSS for React Native)
- React Native Reanimated for animations
- Expo Haptics for tactile feedback
- Expo Router for navigation
- Zustand for state management
- AsyncStorage for data persistence
- Lucide icons
- Playfair Display & DM Sans fonts
- RevenueCat for payments (Premium features)

## Color Palette

- **Primary**: Rich Chocolate Brown (#5C3D2E) - earthy, warm aesthetic from AFeeree logo
- **Accent**: Golden Amber (#C9963C) - sophisticated highlight color
- **Background**: Warm Cream (#FFF9F2) - inviting feel

## Project Structure

```
src/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigation
│   │   ├── index.tsx        # Home dashboard
│   │   ├── syllabus.tsx     # Curriculum modules
│   │   ├── assignments.tsx  # Assignment management
│   │   ├── profile.tsx      # User profile
│   │   └── feedback.tsx     # Two-way feedback messaging
│   ├── access-code.tsx      # Access code entry screen
│   ├── onboarding.tsx       # New user onboarding flow
│   ├── module/[id].tsx      # Module detail with lessons
│   └── _layout.tsx          # Root layout
├── components/
│   ├── HapticButton.tsx     # Reusable button with haptics & animations
│   ├── Skeleton.tsx         # Loading skeleton components
│   ├── ConfettiCelebration.tsx # Confetti celebration animation
│   ├── PracticeTimer.tsx    # Practice session timer
│   └── MandinkaTerms.tsx    # Mandinka vocabulary modal
└── lib/
    ├── theme.ts             # Color palette and styling constants
    ├── types.ts             # TypeScript interfaces
    ├── mockData.ts          # Course data and resources
    ├── userStore.ts         # Zustand store for user state
    └── cn.ts                # Tailwind class merge utility
```

## Future Enhancements

- Backend integration for real data
- Video recording and upload functionality
- Push notifications for due dates
- Offline content caching
- Certificate generation upon completion
- Daily practice reminders
- Audio pronunciation for Mandinka terms (upload files via SOUNDS tab)
