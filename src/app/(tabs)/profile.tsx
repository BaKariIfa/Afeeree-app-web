import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  User,
  Award,
  BookOpen,
  FileCheck,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Mail,
  Calendar,
  ArrowLeft
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';

import { colors } from '@/lib/theme';
import { mockUser, mockModules, mockAssignments } from '@/lib/mockData';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const completedModules = mockModules.filter(m => m.completedLessons === m.lessons && m.lessons > 0).length;
  const completedAssignments = mockAssignments.filter(a => a.status === 'graded').length;
  const totalLessons = mockModules.reduce((acc, m) => acc + m.completedLessons, 0);

  const menuItems = [
    { icon: <Settings size={22} color={colors.neutral[600]} />, label: 'Account Settings', onPress: () => {} },
    { icon: <HelpCircle size={22} color={colors.neutral[600]} />, label: 'Help & Support', onPress: () => {} },
    { icon: <LogOut size={22} color={colors.error} />, label: 'Sign Out', onPress: () => {}, isDestructive: true },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream[100] }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header with Profile */}
        <LinearGradient
          colors={[colors.primary[500], colors.primary[600]]}
          style={{ paddingTop: insets.top + 16, paddingBottom: 60, paddingHorizontal: 24 }}
        >
          {/* Back Button */}
          <Animated.View entering={FadeInDown.duration(600)}>
            <Pressable
              onPress={() => router.push('/(tabs)/')}
              className="p-2 -ml-2 mb-2"
            >
              <ArrowLeft size={24} color="white" />
            </Pressable>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(600)} className="items-center">
            {/* Avatar */}
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 3, borderColor: colors.gold[400] }}
            >
              <User size={40} color="white" />
            </View>

            <Text
              style={{ fontFamily: 'PlayfairDisplay_700Bold', color: 'white' }}
              className="text-2xl"
            >
              {mockUser.name}
            </Text>

            <View
              className="mt-2 px-3 py-1 rounded-full"
              style={{ backgroundColor: colors.gold[500] }}
            >
              <Text
                style={{ fontFamily: 'DMSans_600SemiBold', color: 'white' }}
                className="text-sm"
              >
                {mockUser.certificationLevel} Certification
              </Text>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Stats Cards */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          className="px-6 -mt-10"
        >
          <View
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <View className="flex-row justify-around">
              <View className="items-center">
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: colors.primary[100] }}>
                  <BookOpen size={24} color={colors.primary[500]} />
                </View>
                <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }} className="text-xl">
                  {totalLessons}
                </Text>
                <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }} className="text-xs">
                  Lessons Done
                </Text>
              </View>

              <View className="w-px h-16 self-center" style={{ backgroundColor: colors.neutral[200] }} />

              <View className="items-center">
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: colors.gold[100] }}>
                  <Award size={24} color={colors.gold[600]} />
                </View>
                <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }} className="text-xl">
                  {completedModules}
                </Text>
                <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }} className="text-xs">
                  Modules
                </Text>
              </View>

              <View className="w-px h-16 self-center" style={{ backgroundColor: colors.neutral[200] }} />

              <View className="items-center">
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: colors.primary[100] }}>
                  <FileCheck size={24} color={colors.primary[500]} />
                </View>
                <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }} className="text-xl">
                  {completedAssignments}
                </Text>
                <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }} className="text-xs">
                  Assignments
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Progress Section */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(200)}
          className="px-6 mt-8"
        >
          <Text
            style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.neutral[800] }}
            className="text-xl mb-4"
          >
            Certification Progress
          </Text>

          <View
            className="p-5 rounded-2xl"
            style={{ backgroundColor: 'white', borderWidth: 1, borderColor: colors.neutral[200] }}
          >
            <View className="flex-row justify-between items-center mb-3">
              <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }} className="text-base">
                Overall Progress
              </Text>
              <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.primary[500] }} className="text-base">
                {mockUser.progress}%
              </Text>
            </View>
            <View className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: colors.neutral[200] }}>
              <View
                className="h-full rounded-full"
                style={{
                  backgroundColor: colors.primary[500],
                  width: `${mockUser.progress}%`
                }}
              />
            </View>
            <Text
              style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
              className="text-sm mt-3"
            >
              Complete {100 - mockUser.progress}% more to achieve {mockUser.certificationLevel} certification
            </Text>
          </View>
        </Animated.View>

        {/* Account Info */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300)}
          className="px-6 mt-8"
        >
          <Text
            style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.neutral[800] }}
            className="text-xl mb-4"
          >
            Account Information
          </Text>

          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'white', borderWidth: 1, borderColor: colors.neutral[200] }}
          >
            <View className="p-4 flex-row items-center border-b" style={{ borderBottomColor: colors.neutral[100] }}>
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.primary[100] }}>
                <Mail size={20} color={colors.primary[500]} />
              </View>
              <View className="ml-4 flex-1">
                <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }} className="text-xs">
                  Email
                </Text>
                <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[800] }} className="text-base">
                  {mockUser.email}
                </Text>
              </View>
            </View>

            <View className="p-4 flex-row items-center">
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: colors.gold[100] }}>
                <Calendar size={20} color={colors.gold[600]} />
              </View>
              <View className="ml-4 flex-1">
                <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }} className="text-xs">
                  Enrolled Since
                </Text>
                <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[800] }} className="text-base">
                  {new Date(mockUser.enrollmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(400)}
          className="px-6 mt-8"
        >
          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'white', borderWidth: 1, borderColor: colors.neutral[200] }}
          >
            {menuItems.map((item, index) => (
              <Pressable
                key={item.label}
                onPress={item.onPress}
                className="p-4 flex-row items-center"
                style={{
                  borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                  borderBottomColor: colors.neutral[100]
                }}
              >
                <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: item.isDestructive ? colors.error + '15' : colors.neutral[100] }}>
                  {item.icon}
                </View>
                <Text
                  style={{
                    fontFamily: 'DMSans_500Medium',
                    color: item.isDestructive ? colors.error : colors.neutral[800]
                  }}
                  className="flex-1 ml-4 text-base"
                >
                  {item.label}
                </Text>
                <ChevronRight size={20} color={colors.neutral[400]} />
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* Version */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(500)}
          className="items-center mt-8"
        >
          <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[400] }} className="text-sm">
            AFeeree Certification App v1.0
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
