import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: "light",
        statusBarBackgroundColor: "#01A1C5",
      }}
    >
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
