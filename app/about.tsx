import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://scontent.fpbc2-2.fna.fbcdn.net/v/t39.30808-6/277781378_308546241360563_8116681931907110870_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3kq49zannWXdFWVXAH96S1zKHkvoaiEPXMoeS-hqIQ5MzAvknLmbZwcrFOXgY59MT9QLno6b9icuucp54026q&_nc_ohc=WU7wa_PR0SsQ7kNvgEJdRFq&_nc_zt=23&_nc_ht=scontent.fpbc2-2.fna&_nc_gid=AxfqZt2pLNTkvIqmGIVhc9s&oh=00_AYBulULYl8FLDz5TYtZOlrMDUmEOgdltht1JD5hPGbGRrw&oe=679EF79E" }} 
          style={styles.profileImage}
        />
        <Text style={styles.name}>Adam Michel Zárate Hernández</Text>
        <Text style={styles.text}>Universidad Tecnológica de Izúcar de Matamoros</Text>
        <Text style={styles.text}>Materia: Desarrollo de Aplicaciones Multiplataforma</Text>
        <Text style={styles.text}>Docente: Alfonso Felipe Lima Cortes</Text>
        <Text style={styles.text}>Ultima Actualizacion: 30 de enero de 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#353435",
    padding: 20,
  },
  card: {
    backgroundColor: "#222316",
    borderRadius: 50,
    width: "100%",
    padding: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "red",
    shadowOffset: { width: 10, height: 50 },
    shadowOpacity: 1,
    shadowRadius: 70,
    elevation: 1,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "purple",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
    color: "white",
  },
});
