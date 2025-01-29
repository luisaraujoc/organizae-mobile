import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps,
} from "react-native";
import * as Font from "expo-font";

export default function Textinput(props: TextInputProps) {
  return (
    <View style={styles.container}>
      <NativeTextInput {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "gray",
    borderBottomWidth: 1,
  },
});
