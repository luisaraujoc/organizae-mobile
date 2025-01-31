import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import { ReactNode } from "react";

interface GrupoButtonProps {
  children: string; // Nome do grupo
  hasPhoto?: boolean; // Indica se há uma foto
  photoUrl?: string; // URL da foto
}

export default function GrupoButton({ children, hasPhoto = false, photoUrl }: GrupoButtonProps) {
  const getInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0]; // Retorna a palavra completa se houver apenas uma
    }
    return words.map(word => word.charAt(0).toUpperCase()).join(""); // Retorna as iniciais
  };

  const getLimitedText = (text: string) => {
    const words = text.split(" ");
    if (words.length > 2 || text.length > 12) {
      return `${text.slice(0, 12)}...`;
    }
    return text;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("É CLICÁVEL");
      }}
      style={style.GroupSelectButton}
    >
      <View style={style.circle}>
        {hasPhoto && photoUrl ? (
          <Image source={{ uri: photoUrl }} style={style.image} />
        ) : (
          <Text style={style.initials}>{getInitials(children)}</Text>
        )}
      </View>
      <Text style={style.nomeGrupo}>{getLimitedText(children)}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  GroupSelectButton: {
    backgroundColor: "#e6e6e6",
    padding: 16,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: '35%',
    height: 'auto',
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Para deixar a imagem circular
  },
});