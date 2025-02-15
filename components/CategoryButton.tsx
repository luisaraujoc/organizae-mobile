// CategoryButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CategoryButtonProps {
  name: string;
  id: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  name,
  id,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterItem, isSelected && styles.selectedFilterItem]}
      onPress={() => onSelect(id)}
    >
      <Text style={isSelected ? styles.selectedText : null}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default CategoryButton;