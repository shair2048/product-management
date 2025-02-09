import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "@/api";
import CustomBtn from "@/components/custom-btn";

const TaskDetailScreen = () => {
  // const router = useRouter();
  const params = useLocalSearchParams();

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
          console.error("Error fetching task:", error);
        }
      }
    };
    fetchTask();
  }, [productId]);

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { taskStatus: status });
      // console.log(`Task ${taskId} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating task status:", error);
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
          <CustomBtn label="Update" onChangePress={() => {}} />
        </View>
        <View style={{ flex: 1 }}>
          <CustomBtn label="Delete" onChangePress={() => {}} />
        </View>
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
