import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateSpaceScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [nameCharacterCount, setNameCharacterCount] = useState(0);
  const [descriptionCharacterCount, setDescriptionCharacterCount] = useState(0);
  const router = useRouter();


  useEffect(() => {
    setIsFormValid(name.trim() !== "" && description.trim() !== "");
  }, [name, description]);

 
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token', error);
      return null;
    }
  };


  const getGroupId = async () => {
    try {
        const groupId = await AsyncStorage.getItem("groupId");
        if (groupId !== null) {
            console.log("groupId recuperado:", groupId);
            return groupId;
        } else {
            console.warn("Nenhum groupId encontrado no AsyncStorage.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao recuperar groupId:", error);
        return null;
    }
};


 
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) return;

      setImage(result.assets[0].uri);
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível carregar a imagem.");
    }
  };

  
  const handleSave = async () => {
    setShowAlert(true);

    if (!isFormValid) {
      return;
    }

    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert("Erro", "Token de autenticação não encontrado.");
        return;
      }

      const grupoId = await getGroupId();

      if (!grupoId) {
        Alert.alert("Erro", "Não foi possível recuperar o grupo.");
        return;
      }
      const grupoIdNumber = Number(grupoId);
      const formData = new FormData();
      formData.append('nome', name);
      formData.append('descricao', description);
      formData.append('grupoId', grupoIdNumber.toString());

      if (image) {
        const uri = image;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append('foto', blob, `fotoPerfil.${fileType}`);
      }

      const response = await axios.post("https://organizae-f7aca8e7f687.herokuapp.com/spaces/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.data.status === "sucesso") {
        Alert.alert("Sucesso", response.data.mensagem);
        router.push('/grupos/grupo/home');
      } else {
        Alert.alert("Erro", response.data.mensagem || "Erro ao criar o espaço.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar criar o espaço.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.title}>Conte-nos sobre o novo espaço</Text>
          <Text style={styles.subtitle}>
            O nome e a descrição ajudam os usuários a entenderem do que se trata esta nova seção de avisos.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do espaço *"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameCharacterCount(text.length);
            }}
            maxLength={50}
          />
          <Text style={[styles.characterCount, nameCharacterCount > 50 ? styles.alertText : null]}>
            {nameCharacterCount} / 50
          </Text>

          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descrição *"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setDescriptionCharacterCount(text.length);
            }}
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={[styles.characterCount, descriptionCharacterCount > 500 ? styles.alertText : null]}>
            {descriptionCharacterCount} / 500
          </Text>

          {showAlert && !isFormValid && (
            <Text style={styles.alertText}>
              *Todos os campos devem ser preenchidos!
            </Text>
          )}

          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardHeader} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.cardHeaderImage} />
              ) : (
                <View style={styles.placeholderHeader}>
                  <Ionicons name="image-outline" size={30} color="#777" />
                  <Text style={styles.placeholderTextHeader}>Adicionar Imagem de Capa</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.cardTitle}>{name || "Nome do espaço"}</Text>
            <Text style={styles.cardDescription}>{description || "Descrição"}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} activeOpacity={0.7} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isFormValid ? styles.saveButton : styles.disabledButton]}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 25,
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
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cardHeader: {
    width: "100%",
    height: 120,
    borderBottomWidth: 2,
    borderColor: "#ddd",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTextHeader: {
    color: '#777',
    fontSize: 14,
  },
  cardTitle: {
    color: "#000",
    fontWeight: "bold",
    marginTop: 45,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  cardDescription: {
    color: "#666",
    fontSize: 12,
    marginTop: 5,
    paddingBottom: "7%",
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'justify',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    borderRadius: 30,
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
  characterCount: {
    textAlign: 'right',
    color: '#666',
    marginBottom: 10,
    marginRight: 5,
  }
});
