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
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MagnifyingGlass, FunnelSimple, List, UserCircle } from "phosphor-react-native";
import * as Font from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from 'date-fns';

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
      MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    });
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (!Font.isLoaded) {
    return null;
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy');
  };

  const toggleCategorySelection = (category: string) => {
    setSelectedCategories(prevState =>
      prevState.includes(category)
        ? prevState.filter(item => item !== category)
        : [...prevState, category]
    );
  };

  const isCategorySelected = (category: string) => selectedCategories.includes(category);

  const clearFilters = () => {
    setSelectedCategories([]);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} backgroundColor={"#01A1C5"} />
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => console.log("Menu")}
              style={styles.menu}
            >
              <List size={28} color="#01A1C5" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Buscar</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => console.log("User")}>
              <UserCircle size={32} color="#01A1C5" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.body}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Pesquisa"
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
            <TouchableOpacity 
              style={styles.filterButton} 
              onPress={() => setModalVisible(true)}
            >
              <FunnelSimple size={20} color="#606060" />
            </TouchableOpacity>
          </View>
        </View>
        
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
              <Text style={styles.modalTitle}>Filtros</Text>
              <View style={styles.categoryHeader}>
                <Text style={styles.label}>Categoria (Interesse)</Text>
                <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Limpar Filtros</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoriesContainer}>
                  {["DGTI", "Administrativo", "Hotel de Projetos", "Projeto Integrador", "ADS", "Integrado", "Banco de dados", "EDA", "Superior"].map((item) => (
                    <TouchableOpacity 
                      key={item}
                      style={[styles.filterItem, isCategorySelected(item) && styles.selectedFilterItem]} 
                      onPress={() => toggleCategorySelection(item)}
                    >
                      <Text style={isCategorySelected(item) ? styles.selectedText : null}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              <Text style={styles.label}>Período</Text>
              <View style={styles.dateContainer}>
                <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateInput}>
                  <Text style={styles.dateText}>
                    {startDate ? formatDate(startDate) : "Data inicial"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateInput}>
                  <Text style={styles.dateText}>
                    {endDate ? formatDate(endDate) : "Data Final"}
                  </Text>
                </TouchableOpacity>
              </View>
              {showStartPicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowStartPicker(false);
                    if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                  }}
                />
              )}
              {showEndPicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowEndPicker(false);
                    if (selectedDate) {
                      setEndDate(selectedDate);
                    }
                  }}
                />
              )}
              <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}>
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
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  menu: {
    marginRight: 1,
  },
  headerTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    color: "#01A1C5",
  },
  body: {
    flex: 1,
    paddingHorizontal: '3%',
    paddingTop: '5%',
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: '4%',
    marginTop: '5%',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: '4%',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconButton: {
    padding: '1%',
  },
  filterButton: {
    marginLeft: '5%',
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
    padding: '2%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: '5%',
    color: "#01A1C5",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: '3%',
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: '2%',
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
    marginVertical: '1%',
  },
  filterItem: {
    padding: '1%',
    borderRadius: 8,
    backgroundColor: "transparent",
    marginRight: '2%',
    borderWidth: 1,
    borderColor: "#01A1C5",
    paddingVertical: '0.5%',
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
    marginTop: '2%',
    marginBottom: '8%',
  },
  dateInput: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    borderRadius: 7,
    padding: '2%',
    marginHorizontal: '3%',
    textAlign: "center",
  },
  dateText: {
    color: "#333",
    textAlign: "center",
  },
  applyButton: {
    backgroundColor: "#01A1C5",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#01A1C5",
    paddingVertical: '1%',
    alignItems: "center",
    marginTop: '5%',
    marginBottom: '5%',
    margin: '15%',
  },
  applyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});