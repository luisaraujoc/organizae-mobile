import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import {
  CirclesThreePlus,
  FilePlus,
  FolderPlus,
  Plus,
} from "phosphor-react-native";
import { router } from "expo-router";
import { EnterSpaceModal } from "./entrarEspacoModal";

interface FloatingButtonProps {
  userType: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const handleCreatePost = () => {
    isOpen && setIsOpen(false);
    router.navigate("/grupos/_subTelas/criarPost");
  };

  const handleEnterSpace = () => {
    isOpen && setIsOpen(false);
    setIsPopupVisible(true);
  };

  const handleCreateSpace = () => {
    router.navigate("/grupos/_subTelas/criarEspaco");
    isOpen && setIsOpen(false);
  };

  const handlePopupSubmit = (code: string) => {
    console.log("Código de acesso recebido:", code);
    setIsPopupVisible(false);
  };

  const menuItems = [
    {
      icon: <FolderPlus color="#fff" />,
      label: "Entrar em um espaço",
      onPress: handleEnterSpace,
      show: true,
    },
    {
      icon: <FilePlus color="#fff" />,
      label: "Nova postagem",
      onPress: handleCreatePost,
      show: userType === "admin",
    },
    {
      icon: <CirclesThreePlus color="#fff" />,
      label: "Criar um espaço",
      onPress: handleCreateSpace,
      show: userType === "admin",
    },
  ];

  // Inicialização correta de itemAnimations
  const itemAnimations = useRef(menuItems.map(() => new Animated.Value(0))).current;

  // Animação de abertura e fechamento (geral)
  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animações individuais dos itens (sequencial)
    const itemAnimationsArray = itemAnimations.map((itemAnimation) =>
      Animated.timing(itemAnimation, {
        toValue,
        duration: 200, // Duração um pouco mais curta para cada item
        useNativeDriver: false,
      })
    );

    if (isOpen) {
      // Fecha: executa em reverso e com um pequeno atraso entre cada
      itemAnimationsArray.reverse();
      itemAnimationsArray.forEach((anim, index) => {
        setTimeout(() => anim.start(), index * 50); // Atraso de 50ms
      });
    } else {
      // Abre: executa em ordem, com um pequeno atraso
      itemAnimationsArray.forEach((anim, index) => {
        setTimeout(() => anim.start(), index * 50); // Atraso de 50ms
      });
    }

    setIsOpen(!isOpen);
  };

  // Interpolação para o translateY (usada em cada item)
  const getTranslateY = (itemAnimation: Animated.Value) => {
    return itemAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0], // Desliza de 20px para baixo até a posição original
    });
  };

  const menuOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <EnterSpaceModal
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onSubmit={handlePopupSubmit}
      />

      {isOpen && (
        <Animated.View style={[styles.menu, { opacity: menuOpacity }]}>
          {menuItems.map((item, index) =>
            item.show ? (
              <Animated.View
                key={index}
                style={[
                  styles.menuItemContainer,
                  {
                    transform: [{ translateY: getTranslateY(itemAnimations[index]) }],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={item.onPress}
                  style={styles.menuItemContainer} // Aplicar menuItemContainer aqui também
                >
                  {/* Inversão da ordem aqui */}
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                  <View style={styles.menuItem}>{item.icon}</View>
                </TouchableOpacity>
              </Animated.View>
            ) : null
          )}
        </Animated.View>
      )}

      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Plus color="white" weight="bold" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 30,
    alignItems: "flex-end",
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
    alignItems: "flex-end", // Importante para alinhar os itens à direita
    paddingVertical: 6,
    marginRight: 4,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  menuItem: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: "#06809c",
    marginLeft: 8, // Espaço entre o label e o ícone (agora marginLeft)
  },
  menuItemLabel: {
    color: "#06809c",
    fontWeight: "500",
    fontSize: 16,
    marginRight: 8,
  },
});

export { FloatingButton };