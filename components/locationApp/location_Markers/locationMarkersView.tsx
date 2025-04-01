/*
Vista para mostrar la ubicación del usuario.
Se utiliza expo-location para obtener la ubicación y react-native-maps para mostrarla en un mapa.
*/

import { useEffect, useRef, useState } from "react";
import {Button, StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { fetchLocations } from "./dataSource";
import { router } from "expo-router";
import * as Location from 'expo-location';


export function LocationMarkersView() {
    // Estado para almacenar la ubicación actual del usuario
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    // Estado para almacenar todas las ubicaciones obtenidas de la base de datos
    const [allLocations, setAllLocations] = useState<{ latitude: number; longitude: number }[]>([]);
    // Referencia al componente MapView
    const mapRef = useRef(null);
    

    useEffect(() => {
        // Función para obtener todas las ubicaciones almacenadas
        async function fetchAllLocations() {
            try {
                const locations = await fetchLocations();
                setAllLocations(locations);
            } catch (error) {
                console.error("Error al obtener las ubicaciones:", error);
            }
        }
        fetchAllLocations();
    }, []);

    useEffect(() => {
        // Función para obtener la ubicación actual del usuario
        async function getCurrentLocation() {

        // Obtener la ubicación actual
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        }

        getCurrentLocation();
    }, [location]);

    useEffect(() => {
        // Función para centrar el mapa en la ubicación actual
        async function showLocation() {
            if (location && mapRef.current) {
                try {
                    (mapRef.current as any).animateToRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.1, 
                        longitudeDelta: 0.1, 
                    }, 1000); // Duración de la animación
                } catch (error) {
                    console.error("Error al centrar el mapa:", error);
                }
            }
        }
        showLocation();
    }, [location]); // Ejecutar solo cuando `location` cambie

    return(
        <View style={styles.container}>
            {/* Mapa para mostrar la ubicación actual y las ubicaciones almacenadas */}
            <MapView 
            style={styles.map}
            ref={mapRef}
            zoomEnabled
            initialRegion={{
                latitude: 18.5955558,
                longitude: -98.4907685,
                latitudeDelta: 0.001, 
                longitudeDelta: 0.001,
            }}
            >
                {/* Marcador para la ubicación actual */}
                {location ? (
                    <Marker
                        coordinate={location.coords}
                        pinColor="red"
                    />
                ) : null}

                {/* Marcadores para todas las ubicaciones almacenadas */}
                {allLocations.map((loc, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                        pinColor="#A020F0"
                    />
                ))}
            </MapView>

            {/* Botón para navegar al index principal del proyecto */}
            <View style={styles.button}>
                <Button
                    title="Inicio"
                    onPress={() => router.back()}
                    color="#FF5733" // Cambia el color del botón
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