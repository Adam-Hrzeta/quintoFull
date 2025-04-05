import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://oem.com.mx/elsoldepuebla/img/21175663/1737050982/BASE_LANDSCAPE/480/WhatsApp%20Image%202025-01-16%20at%205.00.37%20PM.webp' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Logo UTIM */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>UTIM</Text>
          <Text style={styles.subtitle}>Desarrollo De Software Multiplataforma</Text>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('./auth')}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('./auth/register')}
          >
            <Text style={[styles.buttonText, { color: '#003366' }]}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 51, 102, 0.7)', // Azul UTIM con transparencia
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logoText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  primaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
});

export default Index;