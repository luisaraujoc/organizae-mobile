  import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
  } from "react-native";
  import { GroupHeader } from "@/components/Header";
  import GrupoButton from "@/components/GrupoButton";

  export default function Group() {
    return (
      <SafeAreaView style={style.container}>
        <GroupHeader />
        <View style={ style.bodySec }>
          <GrupoButton>IFBA</GrupoButton>
        </View>
      </SafeAreaView>
    );
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    bodySec: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    
  });
