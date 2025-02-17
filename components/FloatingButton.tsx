import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import {
  CirclesThreePlus,
  FilePlus,
  FolderPlus,
  Plus,
} from "phosphor-react-native";
import { router } from "expo-router";
import EnterSpaceModal from "./entrarEspacoModal"; // Import correto


interface FloatingButtonProps {
  userType: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const menuTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const menuOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });


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
    // AQUI você coloca a lógica de validação, requisição, etc.
      console.log("Código de acesso recebido:", code);
      setIsPopupVisible(false); //Fecha o modal.

  };

  return (
    <View style={styles.container}>

      {/* Uso do componente EnterSpaceModal */}
      <EnterSpaceModal
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onSubmit={handlePopupSubmit}
      />

      {/* Restante do seu FloatingButton (Menu) */}
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
              handleEnterSpace();
              console.log("Enter Space");
            }}
          >
            <FolderPlus color="#fff" />
          </TouchableOpacity>
          {userType === "admin" && (
            <>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  handleCreatePost();
                  console.log("Create Post");
                }}
              >
                <FilePlus color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  handleCreateSpace();
                  console.log("Create Space");
                }}
              >
                <CirclesThreePlus color="#fff" />
              </TouchableOpacity>
            </>
          )}
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

export { FloatingButton };