# AFeeree Certification Program

A mobile app for dancers and teachers participating in the AFeeree Dance Certification Program. This app supports in-class sessions, allows participants to submit assignments, and track their certification progress.

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

### Syllabus
- Browse all certification modules
- Filter by category (Technique, Theory, Teaching Practice, Research)
- Track progress for each module
- Locked/unlocked module states
- Video demonstration links
- View full syllabus PDF
- Pull-to-refresh and haptic feedback

### Assignments
- View all assignments with status filters
- Submit teaching practice videos
- Upload documents and reflections
- View grades and instructor feedback
- Multiple submission types (video, document, reflection)
- Pull-to-refresh and haptic feedback

### Profile
- View certification progress
- Account information
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
- **Celebration Component**: Confetti animation for completing milestones
- **Skeleton Loading**: Placeholder UI while content loads

## Tech Stack

- Expo SDK 53 with React Native
- NativeWind (Tailwind CSS for React Native)
- React Native Reanimated for animations
- Expo Haptics for tactile feedback
- Expo Router for navigation
- Lucide icons
- Playfair Display & DM Sans fonts

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
│   └── _layout.tsx          # Root layout
├── components/
│   ├── HapticButton.tsx     # Reusable button with haptics & animations
│   ├── Skeleton.tsx         # Loading skeleton components
│   └── Celebration.tsx      # Confetti celebration animation
└── lib/
    ├── theme.ts             # Color palette and styling constants
    ├── types.ts             # TypeScript interfaces
    ├── mockData.ts          # Sample data for development
    └── cn.ts                # Tailwind class merge utility
```

## Future Enhancements

- Backend integration for real data
- Video recording and upload functionality
- Push notifications for due dates
- Offline content caching
- Certificate generation upon completion
- Daily practice reminders
- Lesson bookmarking
- Dark mode support
