import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface createProductBtnProps {
  label: string;
  onChangePress: () => void;
}

const CustomBtn = ({ label, onChangePress }: createProductBtnProps) => {
  return (
    <View style={createBtnStyles.container}>
      <TouchableOpacity
        onPress={onChangePress}
        style={createBtnStyles.btnStyles}
      >
        <Text style={createBtnStyles.btnTextStyles}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBtn;

const createBtnStyles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    height: 76,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#EAECF0",
  },
  btnStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8862F2",
    borderRadius: 100,
  },
  btnTextStyles: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
});
