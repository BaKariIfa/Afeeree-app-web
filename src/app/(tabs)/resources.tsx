import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Linking, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  Globe,
  Lock,
  Crown,
  Play,
  ChevronRight,
  Volume2
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import * as Haptics from 'expo-haptics';

import { colors } from '@/lib/theme';
import { resourceLinks, videoLinks, mandinkaTerms, foundationalPrinciples } from '@/lib/mockData';
import { hasEntitlement } from '@/lib/revenuecatClient';
import { Paywall } from '@/components/Paywall';

const triggerHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export default function ResourcesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    const result = await hasEntitlement('premium');
    if (result.ok) {
      setIsPremium(result.data);
    }
  };

  const onRefresh = () => {
    triggerHaptic();
    setRefreshing(true);
    checkPremiumStatus();
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handlePremiumAction = (action: () => void) => {
    triggerHaptic();
    if (!isPremium) {
      setShowPaywall(true);
      return;
    }
    action();
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.cream[100] }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary[500]}
            colors={[colors.primary[500]]}
          />
        }
      >
        {/* Header */}
        <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 24, paddingBottom: 16 }}>
          <Animated.View entering={FadeInDown.duration(600)} className="flex-row items-center">
            <Pressable
              onPress={() => {
                triggerHaptic();
                router.push('/(tabs)/');
              }}
              className="mr-4 p-2 -ml-2"
            >
              <ArrowLeft size={24} color={colors.neutral[800]} />
            </Pressable>
            <View className="flex-1">
              <Text
                style={{ fontFamily: 'PlayfairDisplay_700Bold', color: colors.neutral[800] }}
                className="text-3xl"
              >
                Resources
              </Text>
              <Text
                style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                className="text-base mt-1"
              >
                Learning materials & references
              </Text>
            </View>
            {!isPremium && (
              <View className="flex-row items-center px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.gold[500] }}>
                <Crown size={14} color="white" />
                <Text style={{ fontFamily: 'DMSans_600SemiBold', color: 'white' }} className="text-sm ml-1">
                  Premium
                </Text>
              </View>
            )}
          </Animated.View>
        </View>

        {/* Premium Notice for Free Users */}
        {!isPremium && (
          <Animated.View entering={FadeInDown.duration(600).delay(50)} className="px-6 mb-6">
            <Pressable
              onPress={() => {
                triggerHaptic();
                setShowPaywall(true);
              }}
              className="p-4 rounded-2xl flex-row items-center"
              style={{ backgroundColor: colors.gold[100], borderWidth: 1, borderColor: colors.gold[300] }}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.gold[500] }}
              >
                <Lock size={24} color="white" />
              </View>
              <View className="flex-1 ml-4">
                <Text
                  style={{ fontFamily: 'DMSans_600SemiBold', color: colors.gold[800] }}
                  className="text-base"
                >
                  Unlock All Resources
                </Text>
                <Text
                  style={{ fontFamily: 'DMSans_400Regular', color: colors.gold[700] }}
                  className="text-sm"
                >
                  Subscribe to access all learning materials
                </Text>
              </View>
              <ChevronRight size={20} color={colors.gold[600]} />
            </Pressable>
          </Animated.View>
        )}

        {/* Cultural Research Section */}
        <Animated.View entering={FadeInUp.duration(500).delay(100)} className="px-6 mb-6">
          <Text
            style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
            className="text-lg mb-3"
          >
            Cultural Research
          </Text>
          <Pressable
            onPress={() => handlePremiumAction(() => openLink(resourceLinks.culturalResearch))}
            className="p-4 rounded-2xl flex-row items-center"
            style={{
              backgroundColor: isPremium ? 'white' : colors.neutral[100],
              borderWidth: 1,
              borderColor: colors.neutral[200],
              opacity: isPremium ? 1 : 0.7
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: isPremium ? colors.primary[100] : colors.neutral[200] }}
            >
              {isPremium ? (
                <Globe size={24} color={colors.primary[500]} />
              ) : (
                <Lock size={24} color={colors.neutral[400]} />
              )}
            </View>
            <View className="flex-1 ml-4">
              <Text
                style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
                className="text-base"
              >
                Cultural Research Document
              </Text>
              <Text
                style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                className="text-sm"
              >
                Historical and cultural context of AFeeree
              </Text>
            </View>
            {isPremium ? (
              <ChevronRight size={20} color={colors.neutral[400]} />
            ) : (
              <View className="flex-row items-center px-2 py-1 rounded-full" style={{ backgroundColor: colors.gold[100] }}>
                <Crown size={12} color={colors.gold[600]} />
              </View>
            )}
          </Pressable>
        </Animated.View>

        {/* Video of Principles Section */}
        <Animated.View entering={FadeInUp.duration(500).delay(150)} className="px-6 mb-6">
          <Text
            style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
            className="text-lg mb-3"
          >
            Video: Key Principles
          </Text>
          <Pressable
            onPress={() => handlePremiumAction(() => openLink(videoLinks.keyPrinciples))}
            className="p-4 rounded-2xl flex-row items-center"
            style={{
              backgroundColor: isPremium ? colors.primary[500] : colors.neutral[400],
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              {isPremium ? (
                <Video size={24} color="white" />
              ) : (
                <Lock size={24} color="white" />
              )}
            </View>
            <View className="flex-1 ml-4">
              <Text
                style={{ fontFamily: 'DMSans_600SemiBold', color: 'white' }}
                className="text-base"
              >
                Seven Foundational Principles
              </Text>
              <Text
                style={{ fontFamily: 'DMSans_400Regular', color: 'rgba(255,255,255,0.8)' }}
                className="text-sm"
              >
                Video explanation of core movement principles
              </Text>
            </View>
            {isPremium ? (
              <Play size={24} color="white" fill="white" />
            ) : (
              <View className="flex-row items-center px-2 py-1 rounded-full" style={{ backgroundColor: colors.gold[500] }}>
                <Crown size={12} color="white" />
              </View>
            )}
          </Pressable>
        </Animated.View>

        {/* Seven Foundational Principles List */}
        <Animated.View entering={FadeInUp.duration(500).delay(200)} className="px-6 mb-6">
          <Text
            style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
            className="text-lg mb-3"
          >
            The Seven Principles
          </Text>
          <View
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: isPremium ? 'white' : colors.neutral[100],
              borderWidth: 1,
              borderColor: colors.neutral[200],
              opacity: isPremium ? 1 : 0.7
            }}
          >
            {foundationalPrinciples.map((principle, index) => (
              <Pressable
                key={principle.name}
                onPress={() => {
                  if (!isPremium) {
                    triggerHaptic();
                    setShowPaywall(true);
                  }
                }}
                className="p-4 flex-row items-center"
                style={{
                  borderBottomWidth: index < foundationalPrinciples.length - 1 ? 1 : 0,
                  borderBottomColor: colors.neutral[100],
                }}
              >
                <View
                  className="w-8 h-8 rounded-full items-center justify-center"
                  style={{ backgroundColor: isPremium ? colors.gold[100] : colors.neutral[200] }}
                >
                  <Text
                    style={{ fontFamily: 'DMSans_600SemiBold', color: isPremium ? colors.gold[600] : colors.neutral[400] }}
                    className="text-sm"
                  >
                    {index + 1}
                  </Text>
                </View>
                <View className="flex-1 ml-3">
                  <Text
                    style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
                    className="text-base"
                  >
                    {principle.name}
                  </Text>
                  {isPremium ? (
                    <Text
                      style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                      className="text-sm mt-0.5"
                    >
                      {principle.description}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[400] }}
                      className="text-sm mt-0.5"
                    >
                      Subscribe to view description
                    </Text>
                  )}
                </View>
                {!isPremium && (
                  <Lock size={16} color={colors.neutral[400]} />
                )}
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* Mandinka Terminology Section */}
        <Animated.View entering={FadeInUp.duration(500).delay(250)} className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
              className="text-lg"
            >
              Mandinka Terminology
            </Text>
            {!isPremium && (
              <View className="flex-row items-center px-2 py-1 rounded-full" style={{ backgroundColor: colors.gold[100] }}>
                <Crown size={12} color={colors.gold[600]} />
                <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.gold[600] }} className="text-xs ml-1">
                  Premium
                </Text>
              </View>
            )}
          </View>
          <View
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: isPremium ? 'white' : colors.neutral[100],
              borderWidth: 1,
              borderColor: colors.neutral[200],
              opacity: isPremium ? 1 : 0.7
            }}
          >
            {mandinkaTerms.map((item, index) => (
              <Pressable
                key={item.term}
                onPress={() => {
                  if (!isPremium) {
                    triggerHaptic();
                    setShowPaywall(true);
                  }
                }}
                className="p-4 flex-row items-center"
                style={{
                  borderBottomWidth: index < mandinkaTerms.length - 1 ? 1 : 0,
                  borderBottomColor: colors.neutral[100],
                }}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: isPremium ? colors.primary[100] : colors.neutral[200] }}
                >
                  {isPremium ? (
                    <Volume2 size={20} color={colors.primary[500]} />
                  ) : (
                    <Lock size={18} color={colors.neutral[400]} />
                  )}
                </View>
                <View className="flex-1 ml-3">
                  <Text
                    style={{ fontFamily: 'DMSans_600SemiBold', color: isPremium ? colors.primary[600] : colors.neutral[500] }}
                    className="text-base"
                  >
                    {item.term}
                  </Text>
                  {isPremium ? (
                    <Text
                      style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[600] }}
                      className="text-sm"
                    >
                      {item.meaning}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[400] }}
                      className="text-sm"
                    >
                      ••••••••
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* Additional Documents Section */}
        <Animated.View entering={FadeInUp.duration(500).delay(300)} className="px-6 mb-6">
          <Text
            style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
            className="text-lg mb-3"
          >
            Additional Documents
          </Text>

          <Pressable
            onPress={() => handlePremiumAction(() => openLink(resourceLinks.notationImages))}
            className="p-4 rounded-2xl flex-row items-center mb-3"
            style={{
              backgroundColor: isPremium ? 'white' : colors.neutral[100],
              borderWidth: 1,
              borderColor: colors.neutral[200],
              opacity: isPremium ? 1 : 0.7
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: isPremium ? colors.gold[100] : colors.neutral[200] }}
            >
              {isPremium ? (
                <FileText size={24} color={colors.gold[600]} />
              ) : (
                <Lock size={24} color={colors.neutral[400]} />
              )}
            </View>
            <View className="flex-1 ml-4">
              <Text
                style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
                className="text-base"
              >
                Notation Images
              </Text>
              <Text
                style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                className="text-sm"
              >
                Visual notation reference guide
              </Text>
            </View>
            {isPremium ? (
              <ChevronRight size={20} color={colors.neutral[400]} />
            ) : (
              <View className="flex-row items-center px-2 py-1 rounded-full" style={{ backgroundColor: colors.gold[100] }}>
                <Crown size={12} color={colors.gold[600]} />
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={() => handlePremiumAction(() => openLink(resourceLinks.syllabus))}
            className="p-4 rounded-2xl flex-row items-center"
            style={{
              backgroundColor: isPremium ? 'white' : colors.neutral[100],
              borderWidth: 1,
              borderColor: colors.neutral[200],
              opacity: isPremium ? 1 : 0.7
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: isPremium ? colors.primary[100] : colors.neutral[200] }}
            >
              {isPremium ? (
                <BookOpen size={24} color={colors.primary[500]} />
              ) : (
                <Lock size={24} color={colors.neutral[400]} />
              )}
            </View>
            <View className="flex-1 ml-4">
              <Text
                style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800] }}
                className="text-base"
              >
                Full Syllabus PDF
              </Text>
              <Text
                style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[500] }}
                className="text-sm"
              >
                Complete curriculum document
              </Text>
            </View>
            {isPremium ? (
              <ChevronRight size={20} color={colors.neutral[400]} />
            ) : (
              <View className="flex-row items-center px-2 py-1 rounded-full" style={{ backgroundColor: colors.gold[100] }}>
                <Crown size={12} color={colors.gold[600]} />
              </View>
            )}
          </Pressable>
        </Animated.View>
      </ScrollView>

      {/* Paywall Modal */}
      <Paywall
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onPurchaseSuccess={checkPremiumStatus}
      />
    </View>
  );
}
