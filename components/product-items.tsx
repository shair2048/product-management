import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

interface productItemProps {
  _id: string;
  productName: string;
  productImage: string;
}

const ProductItems = ({ _id, productName, productImage }: productItemProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "/product-detail", params: { id: _id } });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={productItemStyles.productItems}
    >
      <Image
        style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          backgroundColor: "red",
        }}
        source={{ uri: productImage }}
      />
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
    flexDirection: "row",
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
  },
});
