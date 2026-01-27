import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, CreditCard, Mail, User, Copy, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';

import { colors } from '@/lib/theme';

// Square Web Payments SDK types
declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => Promise<any>;
    };
  }
}

type PaymentStep = 'details' | 'payment' | 'success';

export default function PurchaseScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [step, setStep] = useState<PaymentStep>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [squareLoaded, setSquareLoaded] = useState(false);
  const [card, setCard] = useState<any>(null);

  // Program price - you can change this
  const PROGRAM_PRICE = 299;
  const PROGRAM_NAME = 'AFeeree Certification Program';

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  // Load Square Web Payments SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js'; // Change to 'https://web.squarecdn.com/v1/square.js' for production
    script.async = true;
    script.onload = () => setSquareLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Square payment form when ready
  useEffect(() => {
    if (squareLoaded && step === 'payment' && window.Square) {
      initializeSquare();
    }
  }, [squareLoaded, step]);

  const initializeSquare = async () => {
    if (!window.Square) return;

    try {
      // Replace with your Square Application ID and Location ID
      const SQUARE_APP_ID = process.env.EXPO_PUBLIC_SQUARE_APP_ID || 'YOUR_SQUARE_APP_ID';
      const SQUARE_LOCATION_ID = process.env.EXPO_PUBLIC_SQUARE_LOCATION_ID || 'YOUR_SQUARE_LOCATION_ID';

      const payments = await window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID);
      const cardInstance = await payments.card();
      await cardInstance.attach('#card-container');
      setCard(cardInstance);
    } catch (e) {
      console.error('Failed to initialize Square:', e);
      setError('Failed to load payment form. Please refresh and try again.');
    }
  };

  const generateAccessCode = (): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'AF-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleContinueToPayment = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setStep('payment');
  };

  const handlePayment = async () => {
    if (!card) {
      setError('Payment form not ready. Please wait...');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Tokenize the card
      const tokenResult = await card.tokenize();

      if (tokenResult.status === 'OK') {
        // Send to your backend to process payment
        // Replace with your actual backend endpoint
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceId: tokenResult.token,
            amount: PROGRAM_PRICE * 100, // Square expects cents
            currency: 'USD',
            buyerEmail: email,
            buyerName: name,
          }),
        });

        const result = await response.json();

        if (result.success) {
          // Generate access code on successful payment
          const code = generateAccessCode();
          setAccessCode(code);

          // In production, you'd also:
          // 1. Store the code in your database
          // 2. Send confirmation email with the code

          setStep('success');
        } else {
          setError(result.error || 'Payment failed. Please try again.');
        }
      } else {
        setError('Could not process card. Please check your details.');
      }
    } catch (e) {
      console.error('Payment error:', e);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Demo mode - for testing without Square backend
  const handleDemoPayment = async () => {
    setIsProcessing(true);
    setError('');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const code = generateAccessCode();
    setAccessCode(code);
    setStep('success');
    setIsProcessing(false);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream[100] }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ minHeight: '100%' }}
      >
        <LinearGradient
          colors={[colors.primary[600], colors.primary[500], colors.cream[100]]}
          locations={[0, 0.3, 1]}
          style={{ flex: 1, paddingTop: insets.top + 40, paddingHorizontal: 24, paddingBottom: 40 }}
        >
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: 'rgba(255,255,255,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={40} color={colors.gold[300]} />
            </View>
            <Text
              style={{
                fontFamily: 'PlayfairDisplay_700Bold',
                color: colors.gold[300],
                fontSize: 24,
                marginTop: 16,
                textAlign: 'center',
              }}
            >
              {PROGRAM_NAME}
            </Text>
            <Text
              style={{
                fontFamily: 'DMSans_400Regular',
                color: 'rgba(255,255,255,0.8)',
                fontSize: 16,
                marginTop: 8,
              }}
            >
              Secure Enrollment
            </Text>
          </View>

          {/* Progress Steps */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32 }}>
            {['details', 'payment', 'success'].map((s, index) => (
              <View key={s} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: step === s || (step === 'success' && index < 2) || (step === 'payment' && index === 0)
                      ? colors.gold[500]
                      : 'rgba(255,255,255,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'DMSans_600SemiBold',
                      color: 'white',
                      fontSize: 14,
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                {index < 2 && (
                  <View
                    style={{
                      width: 40,
                      height: 2,
                      backgroundColor: (step === 'payment' && index === 0) || step === 'success'
                        ? colors.gold[500]
                        : 'rgba(255,255,255,0.2)',
                      marginHorizontal: 8,
                    }}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Card */}
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 24,
            }}
          >
            {step === 'details' && (
              <>
                <Text
                  style={{
                    fontFamily: 'PlayfairDisplay_700Bold',
                    color: colors.neutral[800],
                    fontSize: 22,
                    textAlign: 'center',
                  }}
                >
                  Your Information
                </Text>
                <Text
                  style={{
                    fontFamily: 'DMSans_400Regular',
                    color: colors.neutral[500],
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 8,
                    marginBottom: 24,
                  }}
                >
                  Enter your details to enroll in the program
                </Text>

                {/* Name Input */}
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontFamily: 'DMSans_500Medium',
                      color: colors.neutral[700],
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Full Name
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.neutral[100],
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                    }}
                  >
                    <User size={20} color={colors.neutral[400]} />
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder="Enter your full name"
                      placeholderTextColor={colors.neutral[400]}
                      style={{
                        flex: 1,
                        marginLeft: 12,
                        fontFamily: 'DMSans_400Regular',
                        fontSize: 16,
                        color: colors.neutral[800],
                      }}
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={{ marginBottom: 24 }}>
                  <Text
                    style={{
                      fontFamily: 'DMSans_500Medium',
                      color: colors.neutral[700],
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Email Address
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.neutral[100],
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                    }}
                  >
                    <Mail size={20} color={colors.neutral[400]} />
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter your email"
                      placeholderTextColor={colors.neutral[400]}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={{
                        flex: 1,
                        marginLeft: 12,
                        fontFamily: 'DMSans_400Regular',
                        fontSize: 16,
                        color: colors.neutral[800],
                      }}
                    />
                  </View>
                </View>

                {/* Price Display */}
                <View
                  style={{
                    backgroundColor: colors.gold[50],
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 24,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: 'DMSans_500Medium',
                        color: colors.neutral[600],
                        fontSize: 14,
                      }}
                    >
                      {PROGRAM_NAME}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'DMSans_600SemiBold',
                        color: colors.primary[600],
                        fontSize: 24,
                      }}
                    >
                      ${PROGRAM_PRICE}
                    </Text>
                  </View>
                </View>

                {error ? (
                  <Text
                    style={{
                      fontFamily: 'DMSans_400Regular',
                      color: colors.error,
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 16,
                    }}
                  >
                    {error}
                  </Text>
                ) : null}

                <Pressable
                  onPress={handleContinueToPayment}
                  style={{
                    backgroundColor: colors.primary[500],
                    borderRadius: 12,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'DMSans_600SemiBold',
                      color: 'white',
                      fontSize: 16,
                    }}
                  >
                    Continue to Payment
                  </Text>
                  <ArrowRight size={20} color="white" style={{ marginLeft: 8 }} />
                </Pressable>
              </>
            )}

            {step === 'payment' && (
              <>
                <Text
                  style={{
                    fontFamily: 'PlayfairDisplay_700Bold',
                    color: colors.neutral[800],
                    fontSize: 22,
                    textAlign: 'center',
                  }}
                >
                  Payment Details
                </Text>
                <Text
                  style={{
                    fontFamily: 'DMSans_400Regular',
                    color: colors.neutral[500],
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 8,
                    marginBottom: 24,
                  }}
                >
                  Secure payment powered by Square
                </Text>

                {/* Square Card Container */}
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      fontFamily: 'DMSans_500Medium',
                      color: colors.neutral[700],
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Card Information
                  </Text>
                  <View
                    id="card-container"
                    style={{
                      minHeight: 100,
                      backgroundColor: colors.neutral[100],
                      borderRadius: 12,
                      padding: 16,
                    }}
                  />
                </View>

                {/* Order Summary */}
                <View
                  style={{
                    backgroundColor: colors.gold[50],
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 24,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontFamily: 'DMSans_400Regular', color: colors.neutral[600], fontSize: 14 }}>
                      Program Fee
                    </Text>
                    <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[800], fontSize: 14 }}>
                      ${PROGRAM_PRICE}.00
                    </Text>
                  </View>
                  <View
                    style={{ height: 1, backgroundColor: colors.neutral[200], marginVertical: 8 }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.neutral[800], fontSize: 16 }}>
                      Total
                    </Text>
                    <Text style={{ fontFamily: 'DMSans_600SemiBold', color: colors.primary[600], fontSize: 16 }}>
                      ${PROGRAM_PRICE}.00
                    </Text>
                  </View>
                </View>

                {error ? (
                  <Text
                    style={{
                      fontFamily: 'DMSans_400Regular',
                      color: colors.error,
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 16,
                    }}
                  >
                    {error}
                  </Text>
                ) : null}

                {/* Demo Payment Button - Remove in production */}
                <Pressable
                  onPress={handleDemoPayment}
                  disabled={isProcessing}
                  style={{
                    backgroundColor: isProcessing ? colors.primary[300] : colors.primary[500],
                    borderRadius: 12,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}
                >
                  {isProcessing ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <>
                      <CreditCard size={20} color="white" style={{ marginRight: 8 }} />
                      <Text style={{ fontFamily: 'DMSans_600SemiBold', color: 'white', fontSize: 16 }}>
                        Pay ${PROGRAM_PRICE}
                      </Text>
                    </>
                  )}
                </Pressable>

                <Pressable
                  onPress={() => setStep('details')}
                  disabled={isProcessing}
                  style={{
                    paddingVertical: 12,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontFamily: 'DMSans_500Medium', color: colors.neutral[500], fontSize: 14 }}>
                    Go Back
                  </Text>
                </Pressable>

                {/* Security Note */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                  <ShieldCheck size={16} color={colors.neutral[400]} />
                  <Text
                    style={{
                      fontFamily: 'DMSans_400Regular',
                      color: colors.neutral[400],
                      fontSize: 12,
                      marginLeft: 6,
                    }}
                  >
                    Secure payment. Your data is encrypted.
                  </Text>
                </View>
              </>
            )}

            {step === 'success' && (
              <>
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: colors.success + '20',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle size={48} color={colors.success} />
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
                  Payment Successful!
                </Text>
                <Text
                  style={{
                    fontFamily: 'DMSans_400Regular',
                    color: colors.neutral[500],
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 8,
                    marginBottom: 24,
                  }}
                >
                  Welcome to the AFeeree Certification Program, {name}!
                </Text>

                {/* Access Code Display */}
                <View
                  style={{
                    backgroundColor: colors.gold[50],
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'DMSans_500Medium',
                      color: colors.neutral[600],
                      fontSize: 14,
                      textAlign: 'center',
                      marginBottom: 12,
                    }}
                  >
                    Your Access Code
                  </Text>
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 2,
                      borderColor: colors.gold[400],
                      borderStyle: 'dashed',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'DMSans_600SemiBold',
                        color: colors.primary[600],
                        fontSize: 28,
                        textAlign: 'center',
                        letterSpacing: 4,
                      }}
                    >
                      {accessCode}
                    </Text>
                  </View>
                  <Pressable
                    onPress={copyCode}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 12,
                      paddingVertical: 8,
                    }}
                  >
                    <Copy size={16} color={colors.primary[500]} />
                    <Text
                      style={{
                        fontFamily: 'DMSans_500Medium',
                        color: colors.primary[500],
                        fontSize: 14,
                        marginLeft: 6,
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </Text>
                  </Pressable>
                </View>

                {/* Instructions */}
                <View
                  style={{
                    backgroundColor: colors.neutral[100],
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'DMSans_600SemiBold',
                      color: colors.neutral[800],
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    What's Next?
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'DMSans_400Regular',
                      color: colors.neutral[600],
                      fontSize: 14,
                      lineHeight: 22,
                    }}
                  >
                    1. Save your access code above{'\n'}
                    2. Download the AFeeree app or continue on web{'\n'}
                    3. Enter your access code to unlock the program{'\n'}
                    4. A confirmation email has been sent to {email}
                  </Text>
                </View>

                <Pressable
                  onPress={() => router.push('/access-code')}
                  style={{
                    backgroundColor: colors.primary[500],
                    borderRadius: 12,
                    paddingVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'DMSans_600SemiBold',
                      color: 'white',
                      fontSize: 16,
                    }}
                  >
                    Enter Access Code
                  </Text>
                  <ArrowRight size={20} color="white" style={{ marginLeft: 8 }} />
                </Pressable>
              </>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
