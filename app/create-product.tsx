import api from "@/api";
import CustomBtn from "@/components/custom-btn";

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CreateProductScreen = () => {
  const router = useRouter();

  const [productName, setProductName] = useState("");

  const handlePress = async () => {
    await api.post(`/product/create`, {
      productName,
    });

    router.push("/(tabs)");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Product Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Product Name"
            placeholderTextColor="#98A2B3"
            onChangeText={setProductName}
          />
        </View>
      </View>
      <CustomBtn label="Create Product" onChangePress={handlePress} />
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 16,
    marginHorizontal: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    color: "#475467",
    marginBottom: 4,
  },
  textInput: {
    height: 44,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#98A2B3",
    // height: 200,
    textAlignVertical: "top",
  },
});
