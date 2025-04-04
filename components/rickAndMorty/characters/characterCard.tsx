import { Image, StyleSheet, Text, View } from "react-native";
import { Character } from "./characterType";

// Definición del tipo Props
type Props = {
  character: Character; // Propiedad
};

export function CharacterCard({ character }: Props) {

    const getStatusColor = () => {
        switch (character.status){
            case "Alive":
                return styles.status_alive;
            case "Dead":
                return styles.status_dead
            case "unknow":
                return styles.status_unknown
            default:
            return styles.status_unknown
        }
    }

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: character.image }} />
      <View style={styles.content}>
        <Text style={styles.name}>{character.name}</Text>

        <View>
          <Text style={styles.label}>Estatus - Especie</Text>
          <View style={styles.row}>
            <View style={[styles.status, getStatusColor()]}></View>
            <Text style={styles.fieldValue}>{character.status} - {character.species}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Ubicación</Text>
          <Text style={styles.fieldValue}>{character.location.name}</Text>
        </View>

        <View>
          <Text style={styles.label}>origen</Text>
          <Text style={styles.fieldValue}>{character.origin.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 160,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#380655",
    marginVertical: 6,
  },
  image: {
    width: "40%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 6,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: "white",
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "grey",
  },
  status_alive: {
    backgroundColor: "green",
  },
  status_dead: {
    backgroundColor: "red",
  },
  status_unknown: {
    backgroundColor: "orange",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  fieldValue: {
    fontSize: 12,
    color: "white",
    marginInline: 7,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});