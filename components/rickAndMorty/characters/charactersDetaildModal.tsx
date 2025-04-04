// CharacterDetailsModal.tsx

import React from "react";
import { Modal, StyleSheet, Text, View, Button, Image } from "react-native";
import { Character } from "./characterType";

interface CharacterDetailsModalProps {
  character: Character | null;
  visible: boolean;
  onClose: () => void;
}

export function CharacterDetailsModal({ character, visible, onClose }: CharacterDetailsModalProps) {
  if (!character) return null; // Si no hay personaje, no mostrar nada

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image style={styles.modalImage} source={{ uri: character.image }} />
          <Text style={styles.modalTitle}>{character.name}</Text>
          <Text style={styles.modalInfo}>Estatus: {character.status}</Text>
          <Text style={styles.modalInfo}>Especie: {character.species}</Text>
          <Text style={styles.modalInfo}>Ubicación: {character.location.name}</Text>
          <Text style={styles.modalInfo}>Origen: {character.origin.name}</Text>

          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});
