import { Image, StyleSheet, Text, View } from "react-native";
import { Location } from "./locationType"; 


// Definición del tipo Props
type Props = {
  location: Location; // Propiedad
};

export function LocationCard({ location }: Props) {

  return (
    <View style={styles.card}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/locations.webp")}
        />
      <View style={styles.content}>
        <Text style={styles.name}>{location.name}</Text>

        <View>
          <Text style={styles.label}>tipo - dimension</Text>
          <View>
            <Text style={styles.fieldValue}>{location.type} - {location.dimension}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.label}>Residentes</Text>
          <Text style={styles.fieldValue}>{location.residents.length}</Text>
        </View>
        <View>
          <Text style={styles.label}>Creadó</Text>
          <Text style={styles.fieldValue}>{location.created}</Text>
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
    height: 230,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#380655",
    marginVertical: 6,
    alignItems: "center",
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
    fontWeight: "900",
    fontSize: 20,
    color: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  fieldValue: {
    fontSize: 13,
    color: "white",
    marginInline: 7,
  },
});