import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Character } from "./characterType";

type Props = {
  visible: boolean;
  character: Character | null;
  onClose: () => void;
};

export function CharacterModal({ visible, character, onClose }: Props) {
  if (!character) return null;

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.text}>Estatus: {character.status}</Text>
          <Text style={styles.text}>Especie: {character.species}</Text>
          <Text style={styles.text}>Ubicación: {character.location.name}</Text>
          <Text style={styles.text}>Origen: {character.origin.name}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#222",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 14,
    color: "white",
    marginVertical: 2,
  },
  closeButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "red",
    borderRadius: 8,
  },
  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
