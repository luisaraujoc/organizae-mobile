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
      <Stack.Screen name="criarEspaco" />
      {/* <Stack.Screen name="criarPost" /> */}
    </Stack>
  );
}
