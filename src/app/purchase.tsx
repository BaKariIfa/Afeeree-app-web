import React from 'react';
import { View, Text, Pressable, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Globe, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import * as Haptics from 'expo-haptics';

import { colors } from '@/lib/theme';

// Your domain where the web app is hosted
const WEB_PURCHASE_URL = 'https://yourdomain.com/purchase'; // Change this to your domain

export default function PurchaseScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  const handleOpenWeb = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Linking.openURL(WEB_PURCHASE_URL);
  };

  const handleGoBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream[100] }}>
      <LinearGradient
        colors={[colors.primary[600], colors.primary[500], colors.cream[100]]}
        locations={[0, 0.4, 1]}
        style={{ flex: 1, paddingTop: insets.top + 16, paddingHorizontal: 24 }}
      >
        {/* Back Button */}
        <Pressable
          onPress={handleGoBack}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
          }}
        >
          <ArrowLeft size={24} color="white" />
          <Text
            style={{
              fontFamily: 'DMSans_500Medium',
              color: 'white',
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Back
          </Text>
        </Pressable>

        {/* Content */}
        <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 60 }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 32,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 24,
            }}
          >
            {/* Icon */}
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: colors.gold[100],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CreditCard size={40} color={colors.gold[600]} />
              </View>
            </View>

            <Text
              style={{
                fontFamily: 'PlayfairDisplay_700Bold',
                color: colors.neutral[800],
                fontSize: 24,
                textAlign: 'center',
              }}
            >
              Complete Your Purchase
            </Text>
            <Text
              style={{
                fontFamily: 'DMSans_400Regular',
                color: colors.neutral[500],
                fontSize: 15,
                textAlign: 'center',
                marginTop: 12,
                lineHeight: 22,
              }}
            >
              To enroll in the AFeeree Certification Program, please complete your payment on our secure website.
            </Text>

            {/* Benefits */}
            <View
              style={{
                backgroundColor: colors.gold[50],
                borderRadius: 16,
                padding: 20,
                marginTop: 24,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: 'DMSans_600SemiBold',
                  color: colors.neutral[800],
                  fontSize: 14,
                  marginBottom: 12,
                }}
              >
                What you'll get:
              </Text>
              {[
                'Full access to all certification modules',
                'Teaching practice assignments',
                'Direct feedback from BaKari Lindsay',
                'Certificate upon completion',
              ].map((benefit, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: colors.gold[600],
                      marginRight: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'DMSans_400Regular',
                      color: colors.neutral[700],
                      fontSize: 14,
                      flex: 1,
                    }}
                  >
                    {benefit}
                  </Text>
                </View>
              ))}
            </View>

            {/* Purchase Button */}
            <Pressable
              onPress={handleOpenWeb}
              style={{
                backgroundColor: colors.primary[500],
                borderRadius: 12,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Globe size={20} color="white" style={{ marginRight: 8 }} />
              <Text
                style={{
                  fontFamily: 'DMSans_600SemiBold',
                  color: 'white',
                  fontSize: 16,
                }}
              >
                Continue to Payment
              </Text>
            </Pressable>

            {/* Security Note */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 16,
              }}
            >
              <ShieldCheck size={16} color={colors.neutral[400]} />
              <Text
                style={{
                  fontFamily: 'DMSans_400Regular',
                  color: colors.neutral[400],
                  fontSize: 12,
                  marginLeft: 6,
                }}
              >
                Secure payment via Square
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{ paddingBottom: insets.bottom + 24 }}>
          <Text
            style={{
              fontFamily: 'DMSans_400Regular',
              color: colors.neutral[500],
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Already have an access code?{' '}
            <Text
              style={{ color: colors.primary[500], fontFamily: 'DMSans_500Medium' }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/access-code');
              }}
            >
              Enter it here
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
