import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  name: string;
  email: string;
  enrollmentDate: string;
  isOnboarded: boolean;
  completedLessons: string[];
  moduleProgress: Record<string, number>;
  notes: Record<string, string>;
  practiceTime: number;
  darkMode: boolean;

  // Actions
  setUser: (name: string, email: string) => void;
  setOnboarded: (value: boolean) => void;
  markLessonComplete: (moduleId: string, lessonIndex: number) => void;
  saveNote: (moduleId: string, note: string) => void;
  addPracticeTime: (seconds: number) => void;
  toggleDarkMode: () => void;
  loadUserData: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  name: '',
  email: '',
  enrollmentDate: '',
  isOnboarded: false,
  completedLessons: [],
  moduleProgress: {},
  notes: {},
  practiceTime: 0,
  darkMode: false,

  setUser: (name, email) => {
    set({ name, email });
    AsyncStorage.setItem('userName', name);
    AsyncStorage.setItem('userEmail', email);
  },

  setOnboarded: (value) => {
    set({ isOnboarded: value });
    AsyncStorage.setItem('onboardingComplete', value ? 'true' : 'false');
  },

  markLessonComplete: (moduleId, lessonIndex) => {
    const key = `${moduleId}-${lessonIndex}`;
    const current = get().completedLessons;
    if (!current.includes(key)) {
      const updated = [...current, key];
      set({ completedLessons: updated });
      AsyncStorage.setItem('completedLessons', JSON.stringify(updated));

      // Update module progress
      const moduleProgress = { ...get().moduleProgress };
      const moduleLessons = current.filter(l => l.startsWith(`${moduleId}-`)).length + 1;
      moduleProgress[moduleId] = moduleLessons;
      set({ moduleProgress });
      AsyncStorage.setItem('moduleProgress', JSON.stringify(moduleProgress));
    }
  },

  saveNote: (moduleId, note) => {
    const notes = { ...get().notes, [moduleId]: note };
    set({ notes });
    AsyncStorage.setItem('notes', JSON.stringify(notes));
  },

  addPracticeTime: (seconds) => {
    const newTime = get().practiceTime + seconds;
    set({ practiceTime: newTime });
    AsyncStorage.setItem('practiceTime', newTime.toString());
  },

  toggleDarkMode: () => {
    const newValue = !get().darkMode;
    set({ darkMode: newValue });
    AsyncStorage.setItem('darkMode', newValue ? 'true' : 'false');
  },

  loadUserData: async () => {
    try {
      const [
        name,
        email,
        enrollmentDate,
        onboardingComplete,
        completedLessons,
        moduleProgress,
        notes,
        practiceTime,
        darkMode,
      ] = await Promise.all([
        AsyncStorage.getItem('userName'),
        AsyncStorage.getItem('userEmail'),
        AsyncStorage.getItem('enrollmentDate'),
        AsyncStorage.getItem('onboardingComplete'),
        AsyncStorage.getItem('completedLessons'),
        AsyncStorage.getItem('moduleProgress'),
        AsyncStorage.getItem('notes'),
        AsyncStorage.getItem('practiceTime'),
        AsyncStorage.getItem('darkMode'),
      ]);

      set({
        name: name || '',
        email: email || '',
        enrollmentDate: enrollmentDate || '',
        isOnboarded: onboardingComplete === 'true',
        completedLessons: completedLessons ? JSON.parse(completedLessons) : [],
        moduleProgress: moduleProgress ? JSON.parse(moduleProgress) : {},
        notes: notes ? JSON.parse(notes) : {},
        practiceTime: practiceTime ? parseInt(practiceTime, 10) : 0,
        darkMode: darkMode === 'true',
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  },
}));
