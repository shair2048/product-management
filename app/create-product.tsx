import api from "@/api";
import CustomBtn from "@/components/custom-btn";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  Alert,
} from "react-native";

const CreateProductScreen = () => {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Cấp quyền?");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Lưu đường dẫn ảnh
    }
  };

  const handlePress = async () => {
    // await api.post(`/product/create`, {
    //   productName,
    // });

    let formData = new FormData();
    formData.append("productName", productName);
    formData.append("productImage", {
      uri: image,
      name: "product.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await api.post(`/product/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        // Alert.alert("Thành công!", "Sản phẩm đã được tạo.");
        router.push("/(tabs)");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error");
    }
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
          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Ionicons name="cloud-upload-outline" size={40} color="#7D58FF" />
            )}
          </TouchableOpacity>

          {/* <Button title="Select Image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />} */}
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
  uploadBox: {
    width: "100%",
    height: 300,
    marginTop: 16,
    backgroundColor: "#F1F3F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // 100% của parent
    height: "100%",
    borderRadius: 8,
  },
});
