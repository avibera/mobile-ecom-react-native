import React from "react";
import {
    Image,
    StyleSheet,
    Platform,
    View,
    SafeAreaView,
    Text,
    TextInput,
    Dimensions,
    ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { Link } from "expo-router";

const category = [
    {
        id: 1,
        name: "Men",
        slug: "men's clothing",
        full_path: require("../../assets/images/mensClothe.webp"),
    },
    {
        id: 2,
        slug: "women's clothing",
        name: "Women",
        full_path: require("../../assets/images/womanClothe.png"),
    },
    {
        id: 3,
        name: "jewelery",
        slug: "jewelery",
        full_path: require("../../assets/images/jewelry.png"),
    },
    {
        id: 4,
        name: "Electronics",
        slug: "electronics",
        full_path: require("../../assets/images/electronics.png"),
    },
];
const carouselBanner = [
    {
        id: 1,
        full_path: require("../../assets/images/carouselBanner1.jpg"),
    },
    {
        id: 2,
        full_path: require("../../assets/images/carouselBanner2.jpg"),
    },
    {
        id: 3,
        full_path: require("../../assets/images/carouselBanner1.webp"),
    },
];
export default function HomeScreen() {
    const [products, setProducts] = React.useState([]);
    const data = carouselBanner;
    const width = Dimensions.get("window").width;
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    const getAllProducts = () => {
        // const res = await fetch("https://fakestoreapi.com/products");
        // const data = await res.json();
        fetch("https://fakestoreapi.com/products/category/women's%20clothing")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    };

    React.useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <SafeAreaView>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#F66A83" }}>
                            MobileEcom
                        </Text>
                        <View style={styles.normalFlex}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "semibold",
                                    flexDirection: "row",
                                }}
                            >
                                Kohat Enclave, building No. 370
                            </Text>
                            <FontAwesome name="map-marker" size={19} color="#F66A83" />
                        </View>
                    </View>
                    <FontAwesome name="user" size={24} color="black" />
                </View>

                {/* Search Section */}
                <View style={{ paddingHorizontal: 12, paddingVertical: 14, position: "relative" }}>
                    <TextInput style={styles.search} placeholder="Search your items" />
                    <FontAwesome
                        name="search"
                        size={18}
                        color="grey"
                        style={{ position: "absolute", left: 25, top: 28 }}
                    />
                </View>

                {/* Categories */}
                <View
                    style={[
                        styles.normalFlex,
                        {
                            paddingHorizontal: 12,
                            gap: 30,
                            marginHorizontal: "auto",
                            marginVertical: 14,
                        },
                    ]}
                >
                    {category?.map((item) => (
                        <Link key={item?.id} href={`/productCategory/${item.slug}`}>
                            <View style={styles.categoryCard}>
                                <Image
                                    style={{ height: "100%", width: 70 }}
                                    source={item?.full_path}
                                />
                                <Text style={styles.productText}>{item?.name}</Text>
                            </View>
                        </Link>
                    ))}
                </View>

                {/* Carousels Banner */}
                <View style={{ paddingVertical: 18 }}>
                    <Carousel
                        ref={ref}
                        width={width}
                        height={width / 2}
                        data={data}
                        onProgressChange={progress}
                        // renderItem={({ index }) => (
                        //     <View
                        //         style={{
                        //             flex: 1,
                        //             borderWidth: 1,
                        //             justifyContent: "center",
                        //         }}
                        //     >
                        //         <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
                        //     </View>
                        // )}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    paddingHorizontal: 12,
                                }}
                            >
                                <Image
                                    style={{ height: "100%", width: "100%", borderRadius: 12 }}
                                    source={item?.full_path}
                                />
                            </View>
                        )}
                    />
                </View>

                <View style={styles.productContainer}>
                    {products?.map((item, index) => (
                        <View key={index} style={{ width: "28%", gap: 4 }}>
                            <View key={index} style={styles.productCardImage}>
                                <Image
                                    source={{ uri: item?.image }}
                                    style={{ height: "100%", width: "100%", padding: 12 }}
                                />
                            </View>
                            <Text style={styles.productTitle}>{item?.title?.slice(0, 12)}..</Text>
                            <Text style={{ fontWeight: "bold" }}>{item?.price}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingTop: 12,
    },
    normalFlex: {
        flexDirection: "row",
        gap: 8,
        alignContent: "center",
    },
    search: {
        padding: 14,
        borderWidth: 1,
        borderColor: "#F66A83",
        color: "#F66A83",
        borderRadius: 10,
        paddingHorizontal: 40,
    },
    categoryCard: {
        alignContent: "center",
        height: 70,
        width: 80,
        alignItems: "center",
    },
    productText: {
        fontSize: 14,
        fontWeight: "semibold",
        textAlign: "center",
    },
    productContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: "space-evenly",
    },
    productCardImage: {
        height: 150,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "white",
    },
    productTitle: {
        fontSize: 12,
        fontWeight: "semibold",
    },
});
