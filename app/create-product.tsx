import api from "@/api";
import CreateBtn from "@/components/btn-create";
import ProductItems from "@/components/product-items";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";

const CreateProductScreen = () => {
  return (
    <View>
      <Text>Create Product</Text>
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    margin: 10,
  },
});
