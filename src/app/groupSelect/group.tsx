import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { GroupHeader } from "@/components/Header";

export default function GroupSelection() {
  return (
    <SafeAreaView style={style.container}>
      <GroupHeader />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("FUNCIONA FILHO DA PUTA");
          }}
          style={style.UmGrupo}
        >
          <View style={style.circle}></View>
          <Text
            
          >Nome do grupo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  UmGrupo: {
    backgroundColor: "#808080",
    padding: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#100",
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
