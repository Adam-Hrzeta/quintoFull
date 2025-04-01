import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocationCard } from "./locationCard";
import { useEffect, useState } from "react";
import { LocationsResult } from "./locationsResults";
import { DataSource } from "./dataSource";

export function LocationsView() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<LocationsResult>({
        info: {
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },
        results: [],
    });

    const dataSource = new DataSource();

    useEffect(() => {
        setLoading(true);

        dataSource
            .getLocations(page)
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    return (
        <View style={styles.container}>
            {/* Botones de paginación */}
            <View style={styles.paginator}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setPage(page - 1);
                    }}
                    disabled={page === 1 || loading}
                >
                    <Text style={styles.buttonText}>Anterior</Text>
                </TouchableOpacity>

                <View style={styles.pageInfo}>
                    <Text style={styles.nav}>Página</Text>
                    <Text style={styles.nav}>{page}</Text>
                    <Text style={styles.nav}>de</Text>
                    <Text style={styles.nav}>{data.info.pages}</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setPage(page + 1);
                    }}
                    disabled={page === data.info.pages || loading}
                >
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>
            </View>

            {/* Indicador de carga */}
            {loading && <ActivityIndicator size="large" style={styles.loader} />}

            {/* Lista de tarjetas */}
            <FlatList
                data={data.results}
                renderItem={({ item }) => <LocationCard location={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 12,
        backgroundColor:"#353435", 
    },
    paginator: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "600",
    },
    pageInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    loader: {
        marginVertical: 16,
    },
    nav: {
        color:"white",
    }
});