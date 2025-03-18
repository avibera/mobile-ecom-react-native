import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image
                    style={{ height: "100%", width: "100%", objectFit: "contain", padding: 10 }}
                    source={{ uri: selectProduct?.image }}
                />
            </View>

            <View style={{ paddingHorizontal: 16 }}>
                {/* Product Pricing */}
                <View style={{ paddingVertical: 20, gap: 6 }}>
                    <Text style={styles.productTitle}>{selectProduct?.title}</Text>
                    <Text style={{ fontSize: 17, color: "grey" }}>
                        MRP{" "}
                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>
                            <FontAwesome name="rupee" size={19} color="black" />
                            {selectProduct?.price}/-
                        </Text>
                    </Text>
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 14, color: "#F66A83" }}>
                        Check Your Special Offers
                    </Text>
                    <Text>Free Delivery</Text>
                    <View style={styles.normalFlex}>
                        <View style={styles.badge}>
                            <Text style={{ color: "white", fontWeight: 600 }}>
                                {selectProduct?.rating?.rate}
                            </Text>
                            <FontAwesome name="star" size={10} color="white" />
                        </View>
                        <Text style={{ fontWeight: 400, color: "grey" }}>
                            {selectProduct?.rating?.count} Ratings
                        </Text>
                    </View>
                </View>

                {/* Product Description */}
                <View style={{ paddingVertical: 25, gap: 9 }}>
                    <Text style={{ fontSize: 17, fontWeight: 500 }}>Description</Text>
                    <Text style={{ color: "#4d4d4d" }}>{selectProduct?.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 450,
        width: "100%",
        alignSelf: "center",
        backgroundColor: "white",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "grey",
    },
    normalFlex: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
    badge: {
        flexDirection: "row",
        gap: 3,
        height: 24,
        width: 50,
        backgroundColor: "green",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
