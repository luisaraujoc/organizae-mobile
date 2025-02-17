import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
  Text,
} from "react-native";

interface GrupoButtonProps {
  nomeGrupo: string; // Nome do grupo
  idGrupo: number; // ID do grupo
  onPress: () => void; // Ensure onPress is defined
}

export default function GrupoButton({
  nomeGrupo,
  onPress
}: TouchableOpacityProps & GrupoButtonProps) {
  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0]; // Return the full word if there's only one
    }
    return words.map((word) => word.charAt(0).toUpperCase()).join(""); // Return initials
  };

  const getLimitedText = (text: string) => {
    const words = text.split(" ");
    if (words.length > 2 || text.length > 12) {
      return `${text.slice(0, 12)}...`;
    }
    return text;
  };

  return (
    <TouchableOpacity style={style.GroupSelectButton} onPress={onPress}>
      <View style={style.circle}>
        <Text style={style.initials}>{getInitials(nomeGrupo)}</Text>
      </View>
      <Text style={style.nomeGrupo}>{getLimitedText(nomeGrupo)}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  GroupSelectButton: {
    backgroundColor: "#ffff",
    padding: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "30%",
    height: "auto",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    marginHorizontal: 4,
    marginVertical: 4,
  },
  nomeGrupo: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    wordWrap: "break-word",
    lineHeight: 20,
  },
  circle: {
    backgroundColor: "#f2f2f2",
    width: 80,
    height: 80,
    borderRadius: 50,
    marginHorizontal: 2,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});