import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "@/api";
import CustomBtn from "@/components/custom-btn";

const TaskDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  type Product = {
    _id: string;
    productName: string;
  };

  const productId = params.id;
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const fetchTask = async () => {
      if (productId) {
        try {
          const response = await api.get(`/product/${productId}`);
          // console.log(response.data);

          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    fetchTask();
  }, [productId]);

  //   const updateTaskStatus = async (taskId: string, status: string) => {
  //     try {
  //       await api.put(`/tasks/${taskId}`, { taskStatus: status });
  //       // console.log(`Task ${taskId} status updated to ${status}`);
  //     } catch (error) {
  //       console.error("Error updating task status:", error);
  //     }
  //   };

  const updateHandlePress = async () => {
    try {
      await api.put(`/product/update/${productId}`, {
        productName: inputValue,
      });

      setModalVisible(false);
      router.push("/(tabs)");
    } catch (error) {
      console.error("Error deleting product status:", error);
    }
  };

  const deleteHandlePress = async () => {
    try {
      await api.delete(`/product/delete/${productId}`);

      router.push("/(tabs)");
    } catch (error) {
      console.error("Error deleting product status:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={productDetailStyles.container}>
        <View style={productDetailStyles.productLabel}>
          <Text style={productDetailStyles.productTitle}>
            {product?.productName}
          </Text>
        </View>
      </View>
      <View style={productDetailStyles.shortBtns}>
        <View style={{ flex: 1 }}>
          <CustomBtn
            label="Update"
            onChangePress={() => setModalVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomBtn label="Delete" onChangePress={deleteHandlePress} />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyles.modalBlock}>
            <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalTitle}>Update Product Info</Text>
              <TextInput
                style={modalStyles.inputField}
                placeholder="Enter new Product Name"
                value={inputValue}
                onChangeText={setInputValue}
              />
              <View style={modalStyles.btnBlock}>
                <Button
                  title="Save"
                  color="#8862F2"
                  onPress={updateHandlePress}
                />
                <Button
                  title="Cancel"
                  color="#8862F2"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default TaskDetailScreen;

const productDetailStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 16,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "white",
    borderRadius: 8,
    gap: 16,
  },

  productLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    flexWrap: "wrap",
  },

  shortBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const modalStyles = StyleSheet.create({
  modalBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btnBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
