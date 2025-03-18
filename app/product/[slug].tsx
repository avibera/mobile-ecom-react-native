import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function Product() {
    const { slug } = useLocalSearchParams();
    const [selectProduct, setSelectedProduct] = React.useState();

    const getProductById = () => {
        fetch(`https://fakestoreapi.com/products/${slug}`)
            .then((response) => response.json())
            .then((data) => setSelectedProduct(data));
    };
    React.useEffect(() => {
        getProductById();
    }, [slug]);

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image
                    style={{ height: "100%", width: "100%" }}
                    source={{ uri: selectProduct?.image }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 400,
        width: "80%",
    },
});
