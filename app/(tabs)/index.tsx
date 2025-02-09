import api from "@/api";
import CustomBtn from "@/components/custom-btn";
import ProductItems from "@/components/product-items";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  type Task = {
    _id: string;
    productName: string;
  };

  const [products, setProducts] = useState<Task[]>([]);

  useEffect(() => {
    const productsInfo = async () => {
      try {
        const response = await api.get(`/product`);

        setProducts(response.data);
      } catch (error) {
        console.log("Error call API:", error);
      }
    };
    productsInfo();
  }, [products]);

  const handlePress = async () => {
    router.push("/create-product");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {products.map((product, index) => (
            <ProductItems
              key={index}
              _id={product._id}
              productName={product.productName}
            />
          ))}
        </View>
      </ScrollView>
      <CustomBtn label="New Product" onChangePress={handlePress} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    margin: 10,
  },
});
