import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { useEffect } from "react";

function GroupHeader() {
    const loadFont = async () => {
        await Font.loadAsync({
          MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
        });
      };
    
      useEffect(() => {
        loadFont();
      }, []);
    
      if (!Font.isLoaded) {
        return null;
      }

    return (
        <View style={style.container}>
            <Text style={style.title}>Grupos</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,     
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontFamily: "MontserratSemiBold",
        color: "#01A1C5",
    }
});


export { GroupHeader };
