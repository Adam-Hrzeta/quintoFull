import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type ButtonConfig = {
  id: number;
  title: string;
  route: string;
  icon: "people" | "tv" | "map" | "information-circle";
  colors: [string, string];
};

const { width } = Dimensions.get('window');

const buttons: ButtonConfig[] = [
  { 
    id: 1,
    title: "Personajes",
    route: "/rickAndMorty/characters",
    icon: "people",
    colors: ["#FF7F50", "#FF6347"]
  },
  { 
    id: 2,
    title: "Episodios",
    route: "/rickAndMorty/episodes",
    icon: "tv",
    colors: ["#4CAF50", "#2E7D32"]
  },
  { 
    id: 3,
    title: "Ubicaciones",
    route: "/rickAndMorty/locations",
    icon: "map",
    colors: ["#9C27B0", "#7B1FA2"]
  },
  { 
    id: 4,
    title: "Acerca de",
    route: "/aboutScreen",
    icon: "information-circle",
    colors: ["#2196F3", "#1565C0"]
  }
];

export default function IndexAPI() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={["#1a1a2e", "#16213e"]}
        style={styles.container}
      >
        <Animatable.View 
          animation="fadeInDown"
          duration={1500}
          style={styles.header}
        >
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            direction="alternate"
            duration={2000}
            source={{
              uri: "https://www.tvinsider.com/wp-content/uploads/2022/07/rick-and-morty-season-6-adult-swim.jpg",
            }}
            style={styles.profileImage}
          />
          <Animatable.Text 
            animation="fadeIn" 
            delay={300}
            style={styles.title}
          >
            Rick and Morty
          </Animatable.Text>
          <Animatable.Text 
            animation="fadeIn" 
            delay={500}
            style={styles.subtitle}
          >
            ¡Explora los siguientes modulos!
          </Animatable.Text>
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp"
          delay={700}
          style={styles.buttonsContainer}
        >
          {buttons.map((button) => (
            <Animatable.View
              key={button.id}
              animation="zoomIn"
              delay={800 + (button.id * 100)}
            >
              <TouchableOpacity
                onPress={() => router.push(button.route)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={button.colors}
                  style={styles.button}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons 
                    name={button.icon} 
                    size={28} 
                    color="#FFF" 
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>{button.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </Animatable.View>
      </LinearGradient>
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
    paddingVertical: 40,
    minHeight: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: width * 0.85,
    height: width * 0.6,
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: "#9C27B0",
    shadowColor: "#9C27B0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
    textShadowColor: "rgba(156, 39, 176, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#AAA",
    marginBottom: 10,
    textAlign: "center",
    maxWidth: "80%",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  button: {
    width: width * 0.42,
    height: width * 0.35,
    borderRadius: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonIcon: {
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});