import { Redirect } from 'expo-router';

// On mobile, redirect to the main app flow
export default function LandingPage() {
  return <Redirect href="/(tabs)/" />;
}
