import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { AntDesign, Entypo, FontAwesome6, Ionicons, Octicons } from '@expo/vector-icons'; // Import AntDesign

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Inicio de sesión',
              title: 'Inicio de sesión',
              drawerIcon: ({ color, size }) => (
                <AntDesign name="home" size={24} color="black" />
              ),
            }}
          />
          <Drawer.Screen
            name="(API)" 
            options={{
              drawerLabel: 'API',
              title: 'API',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="code-slash" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="(gallery)" 
            options={{
              drawerLabel: 'Galeria',
              title: 'Galeria',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="camera-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="(location)" 
            options={{
              drawerLabel: 'Ubicación',
              title: 'Ubicación',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="location" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="(permissions)" 
            options={{
              drawerLabel: 'Permisos',
              title: 'Permisos en la aplicación',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="shield-checkmark-outline" size={size} color={color}/>
              ),
            }}
          />
          <Drawer.Screen
            name="(auth)" 
            options={{
              drawerItemStyle: { display: "none" },
              title: 'Registro de usuario',
            }}
          />
          <Drawer.Screen
            name="about" 
            options={{
              drawerLabel: 'Acerca del programador',
              title: 'Acerca del programador',
              drawerIcon: ({ color, size }) => (
                <AntDesign name="user" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="+not-found" 
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}