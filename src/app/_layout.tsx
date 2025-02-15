import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: "light",
        statusBarBackgroundColor: "#01A1C5",
        statusBarHidden: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
