# AFeeree Certification Program

A mobile app for dancers and teachers participating in the AFeeree Dance Certification Program. This app supports in-class sessions, allows participants to submit assignments, and track their certification progress.

## Features

### Home Dashboard
- Welcome screen with personalized greeting
- Overall certification progress overview
- Quick stats (active modules, pending assignments)
- Continue learning section with current module
- Upcoming assignments preview

### Syllabus
- Browse all certification modules
- Filter by category (Technique, Theory, Teaching Practice, Research)
- Track progress for each module
- Locked/unlocked module states

### Assignments
- View all assignments with status filters
- Submit teaching practice videos
- Upload documents and reflections
- View grades and instructor feedback
- Multiple submission types (video, document, reflection)

### Profile
- View certification progress
- Account information
- Achievement stats (lessons completed, modules finished, assignments graded)

## Tech Stack

- Expo SDK 53 with React Native
- NativeWind (Tailwind CSS for React Native)
- React Native Reanimated for animations
- Expo Router for navigation
- Lucide icons
- Playfair Display & DM Sans fonts

## Color Palette

- **Primary**: Deep Burgundy (#8B2252) - elegant, professional dance aesthetic
- **Accent**: Warm Gold (#D4A574) - sophisticated highlight color
- **Background**: Cream (#FFF8F0) - warm, inviting feel

## Project Structure

```
src/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigation
│   │   ├── index.tsx        # Home dashboard
│   │   ├── syllabus.tsx     # Curriculum modules
│   │   ├── assignments.tsx  # Assignment management
│   │   └── profile.tsx      # User profile
│   └── _layout.tsx          # Root layout
├── components/              # Reusable UI components
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
- In-app messaging with instructors
- Offline content caching
- Certificate generation upon completion
