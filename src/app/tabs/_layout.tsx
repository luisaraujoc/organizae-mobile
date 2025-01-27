import { Stack, Tabs } from "expo-router";
import { Cards, CardsThree, House } from "phosphor-react-native";

export default function RootLayout() {
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
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({color}) => <Cards size={24} color={color} />,
      }}/>
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({color}) => <House size={24} color={color} />,
      }}/>
      <Tabs.Screen name="group" options={{
        tabBarIcon: ({color}) => <CardsThree size={24} color={color} />,
      }}/>
    </Tabs>
  );
}
