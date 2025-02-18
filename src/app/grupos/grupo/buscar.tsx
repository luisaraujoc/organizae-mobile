import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  MagnifyingGlass,
  FunnelSimple,
  List,
  UserCircle,
  CalendarBlank,
} from "phosphor-react-native";
import * as Font from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import CategoryButton from "@/components/CategoryButton"; // Importando o novo componente

export default function SearchScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const loadFont = async () => {
    await Font.loadAsync({
      MontserratRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
      MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
      MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    });
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (!Font.isLoaded) {
    return null;
  }

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy");
  };

  const toggleCategorySelection = (id: string) => {
    setSelectedCategories((prevState) =>
      prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setStartDate(null);
    setEndDate(null);
  };

  // Lista de categorias fictícias
  const categories = [
    { id: "1", name: "DGTI" },
    { id: "2", name: "Administrativo" },
    { id: "3", name: "Hotel de Projetos" },
    { id: "4", name: "Projeto Integrador" },
    { id: "5", name: "ADS" },
    { id: "6", name: "Integrado" },
    { id: "7", name: "Banco de dados" },
    { id: "8", name: "EDA" },
    { id: "9", name: "Superior" },
  ];

  const handleStartDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowStartPicker(false);
    if (selectedDate) {
      const currentDate = new Date();
      // Se a data selecionada for maior que a data atual, define como a data atual
      const newStartDate = selectedDate > currentDate ? currentDate : selectedDate;

      // Verifica se a nova data inicial é maior que a data final
      if (endDate && newStartDate > endDate) {
        setEndDate(newStartDate); // Ajusta a data final para ser igual à nova data inicial
      }

      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowEndPicker(false);
    if (selectedDate) {
      const currentDate = new Date();
      const newEndDate = selectedDate > currentDate ? currentDate : selectedDate;
  
      // Verifica se a nova data final é menor que a data inicial
      if (startDate && newEndDate < startDate) {
        setEndDate(startDate); // Ajusta a data final para ser igual à data inicial
      } else {
        setEndDate(newEndDate);
      }
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} backgroundColor={"#01A1C5"} />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Buscar</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Pesquisar"
                style={styles.searchInput}
                placeholderTextColor="#B0B0B0"
                value={searchText}
                onChangeText={setSearchText}
                onFocus={() => {}}
              />
              <TouchableOpacity style={styles.iconButton}>
                <MagnifyingGlass size={20} color="#606060" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
              <FunnelSimple size={20} color="#606060" />
            </TouchableOpacity>
          </View>
            {/* area com resultado da pesquisa, ScrollView */}
            <ScrollView style={styles.searchResults}>
            {/*<Text>Resultados da pesquisa</Text>*/}
            </ScrollView>
        </View>

        {/* Modal Code */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.overlayTouchable}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.modalContent}>
              <View style={styles.categoryHeader}>
                <Text style={styles.label}>Categoria (Interesse)</Text>
                <TouchableOpacity
                  onPress={clearFilters}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>Limpar Filtros</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoriesContainer}>
                  {categories.map((category) => (
                    <CategoryButton
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      isSelected={selectedCategories.includes(category.id)}
                      onSelect={toggleCategorySelection}
                    />
                  ))}
                </View>
              </ScrollView>
              <Text style={styles.label}>Período</Text>
              <View style={styles.dateContainer}>
                <TouchableOpacity
                  onPress={() => setShowStartPicker(true)}
                  style={styles.dateInput}
                >
                  <View style={styles.dateContent}>
                    <CalendarBlank size={20} color="#606060" />
                    <Text style={styles.dateText}>
                      {startDate ? formatDate(startDate) : "Data inicial"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowEndPicker(true)}
                  style={styles.dateInput}
                >
                  <View style={styles.dateContent}>
                    <CalendarBlank size={20} color="#606060" />
                    <Text style={styles.dateText}>
                      {endDate ? formatDate(endDate) : "Data Final"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {showStartPicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleStartDateChange}
                />
              )}
              {showEndPicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleEndDateChange}
                />
              )}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    color: "#01A1C5",
    marginLeft: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: "1%",
    backgroundColor: "#fff",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "4%",
    marginTop: "5%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: "4%",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchResults: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  iconButton: {
    padding: "1%",
  },
  filterButton: {
    marginLeft: "5%",
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "4%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "5%",
    color: "#01A1C5",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: "2%",
  },
  clearButton: {
    backgroundColor: "transparent",
  },
  clearButtonText: {
    color: "#606060",
    fontSize: 14,
    fontWeight: "600",
  },
  categoriesContainer: {
    flexDirection: "row",
    marginVertical: "1%",
  },
  filterItem: {
    padding: "1%",
    borderRadius: 8,
    backgroundColor: "transparent",
    marginRight: "2%",
    borderWidth: 1,
    borderColor: "#01A1C5",
    paddingVertical: "0.5%",
  },
  selectedFilterItem: {
    backgroundColor: "#01A1C5",
  },
  selectedText: {
    color: "#FFF",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "2%",
    marginBottom: "8%",
  },
  dateInput: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    borderRadius: 7,
    padding: "2%",
    marginHorizontal: "3%",
  },
  dateContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    color: "#333",
    textAlign: "left", // Alinhando o texto à esquerda
    marginLeft: 5, // Espaço entre o ícone e o texto
  },
  applyButton: {
    backgroundColor: "#01A1C5",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#01A1C5",
    paddingVertical: "1%",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
    margin: "15%",
  },
  applyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});