import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Modal, TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { CameraComponent } from "./cameraView";
import { PhotoPreview } from "./photoPreview";
import * as photoPicker from 'expo-image-picker';

// Definir la interfaz para las props
interface ImagePickerProps {
    onImageSave: (uri: string) => void;
}

export function ImagePicker({ onImageSave }: ImagePickerProps) {
    const [open, setOpen] = useState(false);
    const [cameraOpen, setCameraOPen] = useState(false);
    const [imageUri, setImageUri] = useState<string | undefined | null>(undefined);

    const onTakePicture = (uri?: string) => {
        setImageUri(uri);
        setCameraOPen(false);
    };

    const onNewPhoto = () => {
        setImageUri(undefined);
        setCameraOPen(true);
    };

    const onSaveImage = (uri: string) => {
        // Guardar la imagen en la base de datos o estado
        onImageSave(uri); // Llamar a la función pasada como prop
        Alert.alert("Imagen guardada");

        // Resetear el componente
        setOpen(false);
        setImageUri(undefined);
    };

    const pickImage = async () => {
        let result = await photoPicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImageUri(result.assets[0].uri);
        }
      };

    const renderMenu = (
        <Modal visible={open} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Selecciona una opción</Text>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setCameraOPen(true)}>
                        <Ionicons name="camera" size={24} color="white" style={styles.optionIcon} />
                        <Text style={styles.optionText}>Cámara</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
                        <Ionicons name="image" size={24} color="white" style={styles.optionIcon} />
                        <Text style={styles.optionText}>Galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => setOpen(false)}>
                        <Ionicons name="close" size={24} color="white" style={styles.optionIcon} />
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Ionicons name="add-circle" size={48} color="#6200ea" />
            </TouchableOpacity>

            <Modal 
            visible={open}
            transparent={true}
            animationType="slide"
            >
                {!cameraOpen && !imageUri ? renderMenu : null}

                {cameraOpen ? (
                    <CameraComponent
                    onCancel={() => setCameraOPen(false)}
                    onTakePicture={onTakePicture}
                    />
                ) : null}

                {imageUri ? (
                    <PhotoPreview
                        uri={imageUri}
                        onSave={onSaveImage}
                        onCancel={() => setImageUri(undefined)}
                        newPhoto={onNewPhoto}
                    />
                ) : null}
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    optionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6200ea",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: "100%",
    },
    optionIcon: {
        marginRight: 10,
    },
    optionText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    cancelButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#d32f2f",
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        width: "100%",
    },
    cancelText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});