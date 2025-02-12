import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function CreateSpaceScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Verifica se ambos os campos foram preenchidos
    setIsFormValid(name.trim() !== "" && description.trim() !== "");
  }, [name, description]); // Reexecuta sempre que "name" ou "description" mudar

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled || !result.assets?.length) return;
    setImage(result.assets[0].uri);
  };

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    Alert.alert("Sucesso", "Espaço criado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conte-nos sobre o novo espaço</Text>
      <Text style={styles.subtitle}>
        O nome e a descrição ajudam os usuários a entenderem do que se trata esta nova seção de avisos.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do espaço *"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descrição *"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      {/* Mensagem de alerta quando o formulário não estiver válido */}
      {!isFormValid && (
        <Text style={styles.alertText}>Todos os campos devem ser preenchidos!</Text>
      )}

      <View style={styles.cardContainer}>
        <View style={styles.cardHeader} />
        <TouchableOpacity style={styles.cardAvatarContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.cardAvatar} />
          ) : (
            <Ionicons name="person-outline" size={30} color="#777" />
          )}
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{name || "Nome do espaço"}</Text>
        <Text style={styles.cardDescription}>{description || "Descrição"}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isFormValid ? styles.saveButton : styles.disabledButton]}
          onPress={handleSave}
          disabled={!isFormValid}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },

  textarea: {
    height: 100,
  },

  alertText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },

  cardContainer: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
  },

  cardHeader: {
    width: "100%",
    height: 80,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#1A1A1A",
  },

  cardAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 60,
    overflow: "hidden",
  },

  cardAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 30,
  },

  cardDescription: {
    color: "#ccc",
    fontSize: 12,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },

  cancelButton: {
    backgroundColor: "#E53935",
  },

  saveButton: {
    backgroundColor: "#00AEEF",
  },

  disabledButton: {
    backgroundColor: "#ccc",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
