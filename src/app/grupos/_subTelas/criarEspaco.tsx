import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function CreateSpaceScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [nameCharacterCount, setNameCharacterCount] = useState(0);
  const [descriptionCharacterCount, setDescriptionCharacterCount] = useState(0);

  useEffect(() => {
    setIsFormValid(name.trim() !== "" && description.trim() !== "");
  }, [name, description]);

  const pickImage = async (type: 'avatar' | 'header') => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: type === 'avatar' ? [1, 1] : [4, 3],
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) return;

      if (type === 'avatar') {
        setImage(result.assets[0].uri);
      } else if (type === 'header') {
        setHeaderImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível carregar a imagem.");
    }
  };

  const handleSave = () => {
    setShowAlert(true);

    if (!name.trim() || !description.trim()) {
      return;
    }
    Alert.alert("Sucesso", "Espaço criado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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
          <TouchableOpacity style={styles.cardHeader} onPress={() => pickImage('header')}>
                {headerImage ? (
                    <Image source={{ uri: headerImage }} style={styles.cardHeaderImage} />
                ) : (
                   <View style={styles.placeholderHeader}>
                       <Ionicons name="image-outline" size={30} color="#777" />
                       <Text style={styles.placeholderTextHeader}>Adicionar Imagem de Capa</Text>
                   </View>

                )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardAvatarContainer}
              onPress={() => pickImage('avatar')}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.cardAvatar} />
              ) : (
                <Ionicons name="add-circle" size={30} color="#777" />
              )}
              <View style={styles.cardAvatarBorder} />
            </TouchableOpacity>
            <Text style={styles.cardTitle}>{name || "Nome do espaço"}</Text>
            <Text style={styles.cardDescription}>
              {description || "Descrição"}
            </Text>
          </View>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            isFormValid ? styles.saveButton : styles.disabledButton,
          ]}
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
        fontSize: 14
    },
  cardAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 90,
    overflow: "hidden",
  },
    cardAvatarBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '50%',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#ddd",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        boxSizing: 'border-box'
    },
  cardAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  cardTitle: {
    color: "#000",
    fontWeight: "bold",
    marginTop: 45,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center'
  },
  cardDescription: {
    color: "#666",
    fontSize: 12,
    marginTop: 5,
    paddingBottom: "7%",
    paddingLeft: 20,
    paddingRight: 20,
      textAlign: 'justify'
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
        marginRight: 5
  }
});