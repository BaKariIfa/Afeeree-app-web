// AFeeree Certification Program - Real Course Data
// Based on "A-Feeree: The Physical Language" by BaKari Ifasegun Lindsay

import type { User, Module, Assignment, Notification } from './types';

// Google Drive Resource Links
export const resourceLinks = {
  notationImages: 'https://drive.google.com/file/d/1pq70_m7CfmQXsGW3qwstRpEaPriw2Buz/view?usp=drivesdk',
  syllabus: 'https://drive.google.com/file/d/1HX8JGOOEn-6WvXHC4PKOhfM3u551oClD/view?usp=drivesdk',
  culturalResearch: 'https://drive.google.com/file/d/1SsZkzHSWkQygnpixWrVSmoALOJIWxw7w/view?usp=drivesdk',
};

// Seven Foundational Principles from Asante's African Culture Framework
export const foundationalPrinciples = [
  { name: 'Polyrhythm', description: 'Multiple distinct rhythms maintaining individual identity while creating unified expression' },
  { name: 'Polycentrism', description: 'Movement originating from multiple centers of the body simultaneously' },
  { name: 'Curvilinear Form', description: 'Emphasis on curved, flowing movement patterns' },
  { name: 'Dimensionality', description: 'Use of all spatial planes and levels in movement' },
  { name: 'Epic Memory', description: 'Connection to ancestral and cultural movement traditions' },
  { name: 'Repetition', description: 'Purposeful repetition for mastery and rhythmic grounding' },
  { name: 'Holism', description: 'Integration of mind, body, and spirit in movement practice' },
];

// Mandinka Terminology
export const mandinkaTerms = [
  { term: 'A-Feeree', meaning: 'Training/Method' },
  { term: 'Kunidi', meaning: 'Awakening' },
  { term: 'Kata', meaning: 'Movement' },
  { term: 'Bala', meaning: 'On' },
  { term: 'Barente', meaning: 'Move' },
  { term: 'Saba', meaning: 'Stretch' },
  { term: 'Semboo', meaning: 'Strength' },
  { term: 'Lapi', meaning: 'Beat' },
];

export const mockUser: User = {
  id: '1',
  name: 'Dance Student',
  email: 'student@example.com',
  enrollmentDate: '2024-01-15',
  certificationLevel: 'Foundation',
  progress: 35,
};

// Use local image for all modules
const danceClassImage = require('../../public/image-1769399578.jpeg');

export const mockModules: Module[] = [
  {
    id: '1',
    title: 'Kunindi (Awakening)',
    description: 'Opening positions and foundational torso work. Prepares the body through culturally-informed movement principles for African and African Diasporic dance.',
    notationRef: 'KATA 1-2, Pages 6-8',
    pdfPage: 6,
    localImage: danceClassImage,
    duration: '4 weeks',
    lessons: 8,
    completedLessons: 5,
    isLocked: false,
    category: 'Technique',
  },
  {
    id: '2',
    title: 'Torso Development',
    description: 'Master the two-sectional body approach separating upper (torso, arms, head) and lower (pelvis, legs) with emphasis on spiral, contraction, and release.',
    notationRef: 'KATA 3-4, Pages 9-11',
    pdfPage: 9,
    localImage: danceClassImage,
    duration: '3 weeks',
    lessons: 6,
    completedLessons: 2,
    isLocked: false,
    category: 'Technique',
  },
  {
    id: '3',
    title: 'Foot Rhythms & Isolation',
    description: 'Develop polyrhythmic movement where feet maintain foundational rhythm while upper body layers multiple simultaneous rhythmic patterns.',
    notationRef: 'KATA 5-6, Pages 12-14',
    pdfPage: 12,
    localImage: danceClassImage,
    duration: '3 weeks',
    lessons: 7,
    completedLessons: 0,
    isLocked: false,
    category: 'Technique',
  },
  {
    id: '4',
    title: 'Traditional Squats',
    description: 'Deep squats with core engagement rooted in African dance traditions. Build strength and flexibility through functional movement patterns.',
    notationRef: 'KATA 7-8, Pages 15-17',
    pdfPage: 15,
    localImage: danceClassImage,
    duration: '2 weeks',
    lessons: 5,
    completedLessons: 0,
    isLocked: false,
    category: 'Technique',
  },
  {
    id: '5',
    title: 'Bala-Lapi (On Beat)',
    description: 'Isolated polyrhythmic movements: hand circles, head/neck isolation, shoulder work, rib-cage articulation, and windmill arms with footwork.',
    notationRef: 'KATA 9-12, Pages 18-22',
    pdfPage: 18,
    localImage: danceClassImage,
    duration: '5 weeks',
    lessons: 12,
    completedLessons: 0,
    isLocked: true,
    category: 'Technique',
  },
  {
    id: '6',
    title: 'Saba-Semboo (Stretch & Strength)',
    description: 'Pelvic articulation with arm coordination, lunges, forward bends, lateral stretches, and flat backs with spinal rippling.',
    notationRef: 'KATA 13-16, Pages 23-27',
    pdfPage: 23,
    localImage: danceClassImage,
    duration: '4 weeks',
    lessons: 10,
    completedLessons: 0,
    isLocked: true,
    category: 'Technique',
  },
  {
    id: '7',
    title: 'Flat Backs with Ripples',
    description: 'Spinal articulation techniques creating wave-like movements through the spine for expressive and powerful dance vocabulary.',
    notationRef: 'KATA 17-18, Pages 28-30',
    pdfPage: 28,
    localImage: danceClassImage,
    duration: '3 weeks',
    lessons: 6,
    completedLessons: 0,
    isLocked: true,
    category: 'Technique',
  },
  {
    id: '8',
    title: 'Barente (Move)',
    description: 'Combined choreographic sequences integrating all learned elements into flowing combinations with 6/8 rhythmic pulse.',
    notationRef: 'KATA 19-22, Pages 31-36',
    pdfPage: 31,
    localImage: danceClassImage,
    duration: '6 weeks',
    lessons: 15,
    completedLessons: 0,
    isLocked: true,
    category: 'Technique',
  },
  {
    id: '9',
    title: 'Seven Foundational Principles',
    description: 'Study Polyrhythm, Polycentrism, Curvilinear Form, Dimensionality, Epic Memory, Repetition, and Holism from Asante\'s framework.',
    notationRef: 'Theory Section, Pages 3-5',
    pdfPage: 3,
    localImage: danceClassImage,
    duration: '4 weeks',
    lessons: 7,
    completedLessons: 0,
    isLocked: true,
    category: 'Theory',
  },
];

export const mockAssignments: Assignment[] = [];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to AFeeree',
    message: 'Welcome to the AFeeree Certification Program. Start your journey with the Kunindi module.',
    date: '2024-02-18',
    read: false,
    type: 'announcement',
  },
];
