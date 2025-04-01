import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.tvinsider.com/wp-content/uploads/2022/07/rick-and-morty-season-6-adult-swim.jpg",
        }}
        style={styles.profileImage}
      />
      <Text style={styles.title}>Rick and Morty App</Text>
      <Text style={styles.subtitle}>¡Explora el consumo de mí API!</Text>

      <View style={styles.containerbuttons}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => router.push("/(characters)")}
        >
          <Text style={styles.buttonText}>Personajes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => router.push("/(episodes)")}
        >
          <Text style={styles.buttonText}>Episodios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button3}
          onPress={() => router.push("/(locations)")}
        >
          <Text style={styles.buttonText}>Ubicaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button4}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.buttonText}>Acerca de</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e2f",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#a3a3a3",
    marginBottom: 30,
    textAlign: "center",
  },
  containerbuttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginLeft: "5%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  button1: {
    backgroundColor: "orange",
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    width: "30%", // porcentaje para tener 2 botones por fila
    alignItems: "center",
  },
  button2: {
    backgroundColor: "green",
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    width: "30%",
    alignItems: "center",
  },
  button3: {
    backgroundColor: "purple",
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    width: "30%",
    alignItems: "center",
  },
  button4: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    width: "30%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImage: {
    width: 350,
    height: 300,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: "purple",
  },
});
