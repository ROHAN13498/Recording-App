import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
