/*
Vista para mostrar la ubicación del usuario.
Se utiliza expo-location para obtener la ubicación y react-native-maps para mostrarla en un mapa.
*/

import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { router } from "expo-router";
import { saveLocation } from "./dataSource";

export function LocationView() {
    // Estado para manejar los permisos de ubicación
    const [permission, requestPermission] = Location.useForegroundPermissions();
    // Estado para almacenar la ubicación actual del usuario
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    // Referencia al componente MapView
    const mapRef = useRef(null);

    useEffect(() => {
        // Función para obtener la ubicación actual del usuario
        async function getCurrentLocation() {
            if (!permission?.granted) {
                return; // Salir si no se tienen permisos
            }

            // Solicitar permisos de ubicación
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return; // Salir si los permisos no son concedidos
            }

            // Obtener la ubicación actual
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Guardar la ubicación en Firebase
            if (location) {
                try {
                    await saveLocation(location.coords.latitude, location.coords.longitude);
                } catch (error) {
                    console.error("Error al guardar la ubicación:", error);
                }
            }
        }

        getCurrentLocation();
    }, [permission]);

    useEffect(() => {
        // Función para centrar el mapa en la ubicación actual
        async function showLocation() {
            if(location){
                const camera = await (mapRef?.current as any)?.getCamera();
                camera.center = {
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                };
                (mapRef?.current as any).animateCamera(camera, {duration: 1000});
            }
        }
        showLocation();
    }, [location]);

    // Mostrar mensaje si no se tienen permisos de ubicación
    if(!permission?.granted){
        return(
            <View>
                <Text>Para poder registrar tus ubicaciones debes conceder el permiso al GPS primero</Text>
                <Button
                    onPress={requestPermission}
                    title="Permitir acceso"
                />
            </View>
        );
    }

    return(
        <View style={styles.container}>
            {/* Contenedor para mostrar la ubicación */}
            <View style={styles.locationContainer}>
                <Text>Ubicación:</Text>
                {location && (
                    <Text>
                        Latitud: {location.coords.latitude.toFixed(6)}, 
                        Longitud: {location.coords.longitude.toFixed(6)}
                    </Text>
                )}
            </View>

            {/* Mapa para mostrar la ubicación actual y las ubicaciones almacenadas */}
            <MapView 
            style={styles.map}
            ref={mapRef}
            zoomEnabled
            initialRegion={{
                latitude: 18.5955558,
                longitude: -98.4907685,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            >
                {/* Marcador para la ubicación actual */}
                {location ? (
                    <Marker
                        coordinate={location.coords}
                        pinColor="red"
                    />
                ) : null}
            </MapView>

            {/* Botón para navegar al historial de ubicaciones */}
            <View style={styles.button}>
                <Button
                    title="Historial"	
                    onPress={() => router.push("./history")}
                />
            </View>
        </View>
    );
}

// Estilos para el componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(224, 218, 240, 0.84)',
        padding: 10,
        borderRadius: 5,
        zIndex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'absolute', 
        bottom: 20,
        right: 20,
    }
});