import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";

export default function ProductCategory() {
    const { slug } = useLocalSearchParams();
    const [products, setProducts] = React.useState([]);

    const getProductByCategory = () => {
        fetch(`https://fakestoreapi.com/products/category/${slug}`)
            .then((response) => response.json())
            .then((data) => setProducts(data));
    };
    React.useEffect(() => {
        getProductByCategory();
    }, [slug]);
    return (
        <ScrollView>
            <View>
                <Image
                    source={require("../../assets/images/categoryBanner.jpg")}
                    style={{ height: 200, width: "100%" }}
                />
            </View>
            <View style={styles.productContainer}>
                {products?.map((item, index) => (
                    <Link key={index} href={`/product/${item?.id}`} style={styles.productCard}>
                        <View>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <Text style={styles.productTitle}>{item?.title?.slice(0, 24)}..</Text>
                            <Text style={{ fontWeight: "bold" }}>{item?.price}</Text>
                        </View>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 14,
        paddingVertical: 20,
        paddingHorizontal: 8,
        justifyContent: "center",
    },
    productCard: {
        width: "46%",
        height: 280,
        gap: 4,
        // paddingVertical: 10,
    },
    productImage: {
        height: 240,
        width: "100%",
        objectFit: "contain",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 12,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "semibold",
    },
});
