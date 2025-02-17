import { Stack, Tabs } from "expo-router";
import { House, MagnifyingGlass } from "phosphor-react-native";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        },
        tabBarActiveTintColor: "#01A1C5",
        tabBarInactiveTintColor: '#63656A',
      }}
    >
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({color, size}) => <House size={size} color={color} />,
        tabBarLabel: "Inicio",
      }}/>
      <Tabs.Screen name="buscar" options={{
        tabBarIcon: ({color, size}) => <MagnifyingGlass size={size} color={color} />,
        tabBarLabel: "Buscar",
      }}/>

    </Tabs>
  );
}
