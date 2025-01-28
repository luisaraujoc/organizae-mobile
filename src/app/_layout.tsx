import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: "dark",
        statusBarBackgroundColor: "#fff",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
