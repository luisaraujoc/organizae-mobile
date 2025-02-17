import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

interface EnterSpaceModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

const EnterSpaceModal: React.FC<EnterSpaceModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [accessCode, setAccessCode] = useState("");
  const CODE_LENGTH = 7;
  const textInputRef = useRef<TextInput>(null);

  const handlePopupSubmit = () => {
    const codeRegex = /^[a-zA-Z0-9]{7}$/;
    if (!codeRegex.test(accessCode)) {
      alert("Código inválido.  Digite um código alfanumérico de 7 dígitos.");
      return;
    }
    onSubmit(accessCode);
    setAccessCode("");
  };

  const closeModal = () => {
    onClose();
    setAccessCode("");
  };

  const renderUnderlines = () => {
    const underlines = [];
    for (let i = 0; i < CODE_LENGTH; i++) {
      underlines.push(
        <View
          key={i}
          style={[
            styles.underline,
            accessCode[i] ? styles.filledUnderline : {},
          ]}
        />
      );
    }
    return underlines;
  }

  const handlePressUnderlines = () => {
    textInputRef.current?.focus();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Insira aqui o código da área de interesse informado pelo
              administrador
            </Text>

            <View style={styles.inputContainer}>
              {/* TextInput invisível */}
              <TextInput
                ref={textInputRef}
                style={styles.hiddenInput}
                value={accessCode}
                onChangeText={(text) => setAccessCode(text.toUpperCase())}
                maxLength={CODE_LENGTH}
                autoCapitalize="characters"
                keyboardType="default"
                returnKeyType="done"
                onSubmitEditing={handlePopupSubmit}
                autoFocus={true}
              />

              {/* Área de exibição do código e underlines */}
              <TouchableOpacity
                style={styles.underlineContainer}
                onPress={handlePressUnderlines}
              >
                <View style={styles.inputTextContainer}>
                  {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                    <Text key={i} style={styles.inputText}>
                      {accessCode[i] || ""}
                    </Text>
                  ))}
                </View>
                <View style={styles.underlineWrapper}>
                    {renderUnderlines()}
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>
              Para ter acesso ao espaço de interesse:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPointText}>• Use um acesso autorizado</Text>
              <Text style={styles.bulletPointText}>
                • Use o código do espaço de interesse contendo suas letras e
                números, sem espaços ou símbolos.
              </Text>
            </View>

            <Text style={styles.modalInstrucoes}>
              Caso você tenha problemas para entrar no espaço, contate um
              administrador.
            </Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handlePopupSubmit}
              >
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalInstrucoes: {
    fontSize: 14,
    marginTop: 15,
    color: "#666",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  underlineContainer: {
    width: "70%",
    alignItems: "center",
    position: "relative",
  },
  underlineWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 5,
  },
  underline: {
    width: 20,
    height: 2,
    backgroundColor: "#ccc",
  },
  filledUnderline: {
    backgroundColor: "#01A1C5",
  },
  inputTextContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 2,
  },
  inputText: {
    fontSize: 20,
    textAlign: "center",
    width: 20,
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    zIndex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  submitButton: {
    backgroundColor: "#01A1C5",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bulletPoints: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 5,
  },
  bulletPointText: {
    fontSize: 13,
    marginBottom: 3,
    lineHeight: 18,
    color: "#666",
  },
});

export default EnterSpaceModal;