import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

type SocialLink = {
  name: string;
  icon: "logo-github" | "logo-youtube" | "logo-facebook";
  url: string;
};

const about_image = require("../assets/images/about_image.jpg"); // Adjust the path as necessary 

const socialLinks: SocialLink[] = [
  { name: "github", icon: "logo-github", url: "https://github.com/Adam-Hrzeta" },
  { name: "youtube", icon: "logo-youtube", url: "https://www.youtube.com/@SoundShorty2023" },
  { name: "email", icon: "logo-facebook", url: "https://www.facebook.com/profile.php?id=100066155683295" },
];

export default function About() {
  const handleSocialPress = (url: string): void => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Animatable.View 
          animation="fadeInUp"
          duration={1000}
          style={styles.card}
        >
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            direction="alternate"
            duration={2000}
            source={about_image}
            style={styles.profileImage}
          />
          
          <Text style={styles.name}>Adam Michel Zárate Hernández</Text>
          
          <View style={styles.socialContainer}>
            {socialLinks.map((social, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => handleSocialPress(social.url)}
                style={styles.socialButton}
              >
                <Ionicons name={social.icon} size={24} color="#FFF" />
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="school" size={20} color="#8A2BE2" />
              <Text style={styles.text}>Universidad Tecnológica de Izúcar de Matamoros</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="book" size={20} color="#8A2BE2" />
              <Text style={styles.text}>Materia: Desarrollo Móvil Multiplataforma</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="person" size={20} color="#8A2BE2" />
              <Text style={styles.text}>Docente: Alfonso Felipe Lima Cortes</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={20} color="#8A2BE2" />
              <Text style={styles.text}>Última actualización: 08 de abril de 2025</Text>
            </View>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
    padding: 20,
  },
  card: {
    backgroundColor: "#222316",
    borderRadius: 30,
    width: "100%",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginVertical: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#8A2BE2",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFF",
    textAlign: "center",
    textShadowColor: "rgba(138, 43, 226, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  socialContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#333",
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  infoContainer: {
    width: "100%",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(138, 43, 226, 0.1)",
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#8A2BE2",
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    color: "#FFF",
    flexShrink: 1,
  },
});