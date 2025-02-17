import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import {
  CirclesThreePlus,
  FilePlus,
  FolderPlus,
  Plus,
} from "phosphor-react-native";
import { EnterGroupModal } from "./entrarEspacoModal";

export default function FloatingGButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // Valor inicial da animação

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1, // Muda o valor de 0 a 1
      duration: 300, // Duração da animação
      useNativeDriver: false, // Não use o driver nativo para animações de opacidade
    }).start();
  };

  const menuTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0], // Mover o menu de 20 para 0
  });

  const menuOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Mudar a opacidade de 0 a 1
  });

  const handleAddGroup = () => {
    isOpen && setIsOpen(false);
    setIsPopupVisible(true);
  };

  const handlePopupSubmit = (code: string) => {
    console.log("Código de acesso recebido:", code);
    setIsPopupVisible(false);
  };

  const handleCreateGroup = () => {
    // Navegar para a tela de adicionar grupo
  };

  return (
    <View style={styles.container}>

      <EnterGroupModal
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onSubmit={handlePopupSubmit}
      />


      {isOpen && (
        <Animated.View
          style={[
            styles.menu,
            {
              opacity: menuOpacity,
              transform: [{ translateY: menuTranslateY }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              handleAddGroup();
              console.log("Entrar no Grupo");
            }}
          >
            <FolderPlus color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              handleCreateGroup();
              console.log("Criar Grupo");
            }}
          >
            <FilePlus color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Plus color="white" weight="bold" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  fab: {
    backgroundColor: "#01A1C5",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  menuItem: {
    padding: 12,
    borderRadius: 30,
    marginVertical: 6,
    backgroundColor: "#06809c",
  },
});