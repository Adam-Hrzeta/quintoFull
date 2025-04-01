import React, { useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { ImagePicker } from "../imagePicker/imagePicker";

export function ImagesGallery() {
    const [images, setImages] = useState<string[]>([]);

    const handleImageSave = (uri: string) => {
        setImages([...images, uri]);
    };

    return (
        <View style={styles.container}>
            <ImagePicker onImageSave={handleImageSave} />

            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingVertical: 20,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 130,
        height: 130,
        margin: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    }
});