import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface productItemProps {
  _id: string;
  productName: string;
}

const ProductItems = ({ _id, productName }: productItemProps) => {
  const router = useRouter();

  //   const handlePress = () => {
  //     router.push({ pathname: "/task-details", params: { id: _id } });
  //   };

  return (
    <TouchableOpacity onPress={() => {}} style={productItemStyles.productItems}>
      <Text style={productItemStyles.productName}>{productName}</Text>
    </TouchableOpacity>
  );
};

export default ProductItems;

const productItemStyles = StyleSheet.create({
  productItems: {
    padding: 12,
    // marginTop: 12,
    gap: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderColor: "#EAECF0",
    borderWidth: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
  },
});
