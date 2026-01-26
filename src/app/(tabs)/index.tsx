import React from 'react';
import { View, Text, ScrollView, Pressable, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BookOpen, Trophy, Clock, ChevronRight, Bell, Home, FileText, User, Library } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';

import { colors } from '@/lib/theme';
import { mockUser, mockModules, mockAssignments, mockNotifications } from '@/lib/mockData';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').length;
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  const inProgressModule = mockModules.find(m => m.completedLessons > 0 && m.completedLessons < m.lessons);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream[100] }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header with Background Image */}
        <View style={{ position: 'relative' }}>
          <ImageBackground
            source={require('../../../public/image-1769399578.jpeg')}
            style={{ paddingTop: insets.top + 16, paddingBottom: 24, paddingHorizontal: 24 }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            {/* Bell Icon */}
            <Animated.View
              entering={FadeInDown.duration(600)}
              className="flex-row justify-end"
            >
              <Pressable
                className="relative p-2"
                onPress={() => {}}
              >
                <Bell size={24} color="white" />
                {unreadNotifications > 0 && (
                  <View
                    className="absolute top-1 right-1 w-4 h-4 rounded-full items-center justify-center"
                    style={{ backgroundColor: colors.gold[500] }}
                  >
                    <Text className="text-[10px] text-white font-bold">{unreadNotifications}</Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>

            {/* Logo */}
            <Animated.View
              entering={FadeInDown.duration(600).delay(100)}
              className="items-center mt-2"
            >
              <Image
                source={require('../../../public/image-1769399524.png')}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                contentFit="cover"
              />
              <Text
                style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.gold[300] }}
                className="text-lg mt-3 text-center"
              >
                AFeeree Certification Program
              </Text>
              <Text
                style={{ fontFamily: 'DMSans_400Regular', color: 'rgba(255,255,255,0.8)' }}
                className="text-sm mt-1 text-center"
              >
                The Physical Language
              </Text>
            </Animated.View>
          </ImageBackground>
        </View>

        {/* Menu Bar - Navigation Icons */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(150)}
          className="mx-6 -mt-5 rounded-2xl p-3"
          style={{ backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 }}
        >
          <View className="flex-row justify-around items-center">
            <Pressable
              className="items-center py-2 px-4"
              onPress={() => router.push('/(tabs)/')}
            >
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.primary[100] }}>
                <Home size={20} color={colors.primary[500]} />
              </View>
              <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.primary[500] }} className="text-xs mt-1">Home</Text>
            </Pressable>

            <Pressable
              className="items-center py-2 px-4"
              onPress={() => router.push('/(tabs)/syllabus')}
            >
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.neutral[100] }}>
                <BookOpen size={20} color={colors.neutral[500]} />
              </View>
              <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[500] }} className="text-xs mt-1">Syllabus</Text>
            </Pressable>

            <Pressable
              className="items-center py-2 px-4"
              onPress={() => router.push('/(tabs)/assignments')}
            >
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.neutral[100] }}>
                <FileText size={20} color={colors.neutral[500]} />
              </View>
              <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[500] }} className="text-xs mt-1">Tasks</Text>
            </Pressable>

            <Pressable
              className="items-center py-2 px-4"
              onPress={() => router.push('/(tabs)/two')}
            >
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.neutral[100] }}>
                <Library size={20} color={colors.neutral[500]} />
              </View>
              <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[500] }} className="text-xs mt-1">Resources</Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Welcome Section - Simplified */}
        <Animated.View entering={FadeInDown.duration(600).delay(200)} className="px-6 mt-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text
                style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                className="text-sm"
              >
                Welcome back
              </Text>
              <Text
                style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.neutral[800] }}
                className="text-xl"
              >
                {mockUser.name}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text
                style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[400] }}
                className="text-xs mr-2"
              >
                {mockUser.certificationLevel}
              </Text>
              <Trophy size={20} color={colors.gold[500]} />
            </View>
          </View>
        </Animated.View>

        {/* Continue Learning Section */}
        {inProgressModule && (
          <Animated.View entering={FadeInDown.duration(600).delay(250)} className="px-6 mt-6">
            <Text
              style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.neutral[800] }}
              className="text-xl mb-4"
            >
              Continue Learning
            </Text>
            <Pressable
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 }}
              onPress={() => router.push('/(tabs)/syllabus')}
            >
              <View className="p-4">
                <View className="flex-row items-center mb-2">
                  <View
                    className="px-2 py-1 rounded-full"
                    style={{ backgroundColor: colors.primary[100] }}
                  >
                    <Text
                      style={{ fontFamily: 'DMSans_500Medium', color: colors.primary[500] }}
                      className="text-xs"
                    >
                      {inProgressModule.category}
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[400] }}
                    className="text-xs ml-2"
                  >
                    {inProgressModule.duration}
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
                  className="text-lg"
                >
                  {inProgressModule.title}
                </Text>
                <View className="flex-row items-center mt-3">
                  <View className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: colors.neutral[200] }}>
                    <View
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: colors.primary[500],
                        width: `${(inProgressModule.completedLessons / inProgressModule.lessons) * 100}%`
                      }}
                    />
                  </View>
                  <Text
                    style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[500] }}
                    className="text-xs ml-3"
                  >
                    {inProgressModule.completedLessons}/{inProgressModule.lessons} lessons
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        )}

        {/* Quick Stats - At bottom */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(300)}
          className="flex-row px-6 mt-6"
        >
          <View
            className="flex-1 mr-3 p-4 rounded-2xl"
            style={{ backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.primary[100] }}>
                <BookOpen size={20} color={colors.primary[500]} />
              </View>
              <View className="ml-3">
                <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }} className="text-xl">
                  {mockModules.filter(m => !m.isLocked).length}
                </Text>
                <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }} className="text-xs">
                  Active Modules
                </Text>
              </View>
            </View>
          </View>

          <View
            className="flex-1 p-4 rounded-2xl"
            style={{ backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.gold[100] }}>
                <Clock size={20} color={colors.gold[600]} />
              </View>
              <View className="ml-3">
                <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }} className="text-xl">
                  {pendingAssignments}
                </Text>
                <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }} className="text-xs">
                  Due Soon
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Upcoming Assignments */}
        {mockAssignments.length > 0 && (
          <Animated.View entering={FadeInDown.duration(600).delay(350)} className="px-6 mt-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text
                style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.neutral[800] }}
                className="text-xl"
              >
                Upcoming Assignments
              </Text>
              <Pressable
                className="flex-row items-center"
                onPress={() => router.push('/(tabs)/assignments')}
              >
                <Text
                  style={{ fontFamily: 'DMSans_500Medium', color: colors.primary[500] }}
                  className="text-sm"
                >
                  See All
                </Text>
                <ChevronRight size={16} color={colors.primary[500]} />
              </Pressable>
            </View>

            {mockAssignments
              .filter(a => a.status === 'pending')
              .slice(0, 2)
              .map((assignment, index) => (
                <Animated.View
                  key={assignment.id}
                  entering={FadeInRight.duration(500).delay(400 + index * 100)}
                >
                  <Pressable
                    className="mb-3 p-4 rounded-xl flex-row items-center"
                    style={{ backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
                    onPress={() => router.push('/(tabs)/assignments')}
                  >
                    <View
                      className="w-12 h-12 rounded-xl items-center justify-center"
                      style={{ backgroundColor: colors.gold[100] }}
                    >
                      <Clock size={24} color={colors.gold[600]} />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text
                        style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
                        className="text-base"
                        numberOfLines={1}
                      >
                        {assignment.title}
                      </Text>
                      <Text
                        style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                        className="text-sm mt-0.5"
                      >
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Text>
                    </View>
                    <ChevronRight size={20} color={colors.neutral[400]} />
                  </Pressable>
                </Animated.View>
              ))}
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
