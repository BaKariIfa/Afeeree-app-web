import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, Clock, Lock, ChevronRight, Play } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';

import { colors } from '@/lib/theme';
import { mockModules } from '@/lib/mockData';
import type { Module } from '@/lib/types';

const categories = ['All', 'Technique', 'Theory', 'Teaching Practice', 'Research'] as const;

export default function SyllabusScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const filteredModules = selectedCategory === 'All'
    ? mockModules
    : mockModules.filter(m => m.category === selectedCategory);

  const getProgressPercentage = (module: Module) => {
    if (module.lessons === 0) return 0;
    return Math.round((module.completedLessons / module.lessons) * 100);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream[100] }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 24, paddingBottom: 16 }}>
          <Animated.View entering={FadeInDown.duration(600)}>
            <Text
              style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.neutral[800] }}
              className="text-3xl"
            >
              Syllabus
            </Text>
            <Text
              style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
              className="text-base mt-2"
            >
              AFeeree Certification Curriculum
            </Text>
          </Animated.View>
        </View>

        {/* Category Filter */}
        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
            contentContainerStyle={{ paddingRight: 24 }}
            style={{ flexGrow: 0 }}
          >
            {categories.map((category, index) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                className="mr-2 px-4 py-2 rounded-full"
                style={{
                  backgroundColor: selectedCategory === category ? colors.primary[500] : 'white',
                  borderWidth: 1,
                  borderColor: selectedCategory === category ? colors.primary[500] : colors.neutral[200],
                }}
              >
                <Text
                  style={{
                    fontFamily: 'DMSans_500Medium',
                    color: selectedCategory === category ? 'white' : colors.neutral[600]
                  }}
                  className="text-sm"
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Modules List */}
        <View className="px-6 mt-6">
          {filteredModules.map((module, index) => (
            <Animated.View
              key={module.id}
              entering={FadeInUp.duration(500).delay(200 + index * 100)}
            >
              <Pressable
                className="mb-4 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 3,
                  opacity: module.isLocked ? 0.7 : 1,
                }}
                disabled={module.isLocked}
              >
                <View className="flex-row">
                  {/* Module Image */}
                  <View className="relative">
                    <Image
                      source={module.localImage || { uri: module.imageUrl }}
                      style={{ width: 110, height: 140 }}
                      contentFit="cover"
                    />
                    {module.isLocked ? (
                      <View
                        className="absolute inset-0 items-center justify-center"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                      >
                        <Lock size={28} color="white" />
                      </View>
                    ) : module.completedLessons > 0 && module.completedLessons < module.lessons ? (
                      <View
                        className="absolute inset-0 items-center justify-center"
                        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                      >
                        <View
                          className="w-12 h-12 rounded-full items-center justify-center"
                          style={{ backgroundColor: colors.primary[500] }}
                        >
                          <Play size={24} color="white" fill="white" />
                        </View>
                      </View>
                    ) : null}
                  </View>

                  {/* Module Info */}
                  <View className="flex-1 p-4 justify-between">
                    <View>
                      <View className="flex-row items-center mb-2">
                        <View
                          className="px-2 py-1 rounded-full"
                          style={{ backgroundColor: colors.primary[100] }}
                        >
                          <Text
                            style={{ fontFamily: 'DMSans_500Medium', color: colors.primary[500] }}
                            className="text-xs"
                          >
                            {module.category}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
                        className="text-base"
                        numberOfLines={2}
                      >
                        {module.title}
                      </Text>
                    </View>

                    <View>
                      {/* Duration and Lessons */}
                      <View className="flex-row items-center mt-2">
                        <Clock size={14} color={colors.neutral[400]} />
                        <Text
                          style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                          className="text-xs ml-1"
                        >
                          {module.duration}
                        </Text>
                        <View className="mx-2 w-1 h-1 rounded-full" style={{ backgroundColor: colors.neutral[300] }} />
                        <BookOpen size={14} color={colors.neutral[400]} />
                        <Text
                          style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                          className="text-xs ml-1"
                        >
                          {module.lessons} lessons
                        </Text>
                      </View>

                      {/* Progress Bar */}
                      {!module.isLocked && (
                        <View className="mt-3 flex-row items-center">
                          <View className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: colors.neutral[200] }}>
                            <View
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: getProgressPercentage(module) === 100 ? colors.success : colors.primary[500],
                                width: `${getProgressPercentage(module)}%`
                              }}
                            />
                          </View>
                          <Text
                            style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[500] }}
                            className="text-xs ml-2"
                          >
                            {getProgressPercentage(module)}%
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Arrow */}
                  <View className="justify-center pr-3">
                    <ChevronRight size={20} color={module.isLocked ? colors.neutral[300] : colors.neutral[400]} />
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Info Card */}
        <Animated.View
          entering={FadeInUp.duration(500).delay(600)}
          className="mx-6 mt-4 p-4 rounded-2xl"
          style={{ backgroundColor: colors.gold[100], borderWidth: 1, borderColor: colors.gold[200] }}
        >
          <Text
            style={{ fontFamily: 'DMSans_600SemiBold', color: colors.gold[800] }}
            className="text-base"
          >
            Complete modules to unlock more content
          </Text>
          <Text
            style={{ fontFamily: 'DMSans_400Regular', color: colors.gold[700] }}
            className="text-sm mt-1"
          >
            Locked modules will become available as you progress through the certification program.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
