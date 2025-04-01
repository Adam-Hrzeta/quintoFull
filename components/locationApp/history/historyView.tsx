// HistoryScreen.tsx
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import LocationCard from "./locationCard";
import { fetchHistoryLocations, HistoryLocation } from "./dataSource";

export default function HistoryView() {
    const [locations, setLocations] = useState<HistoryLocation[]>([]);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const history = await fetchHistoryLocations();
                setLocations(history);
            } catch (error) {
                console.error("Error loading history:", error);
            }
        };
        loadHistory();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Ubicaciones</Text>
            <FlatList
                data={locations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LocationCard location={item} />}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay ubicaciones registradas.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#aaa",
        marginTop: 20,
    },
});