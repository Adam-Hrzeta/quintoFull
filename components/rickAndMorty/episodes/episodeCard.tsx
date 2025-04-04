import { Image, StyleSheet, Text, View } from "react-native";
import { Episode } from "./episodeType";

// Definición del tipo Props
type Props = {
  episode: Episode; // Propiedad
};

export function EpisodeCard({ episode }: Props) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={require("C:/Users/adamz/Documents/programacion/Programacion_Movil/cuartoFull/assets/images/episodes.jpg")}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{episode.name}</Text>
        <View>
          <Text style={styles.label}>Fecha de emisión</Text>
          <View>
            <Text style={styles.episodes}>{episode.air_date}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Apariciones</Text>
          <Text style={styles.episodes}>{episode.characters.length}</Text>
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
    height: 170,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#380655",
    marginVertical: 4,
    alignItems: "center",
  },
  image: {
    width: "30%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 8,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 4,
    gap: 2,
  },
  name: {
    fontWeight: "900",
    fontSize: 25,
    color: "white",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  episodes: {
    fontSize: 14,
    color: "white",
    marginInline: 7,
  },
});