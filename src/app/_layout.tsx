import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext"; // Importe o AuthProvider
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider> {/* Envolve toda a navegação com AuthProvider */}
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
    </AuthProvider>
  );
}
