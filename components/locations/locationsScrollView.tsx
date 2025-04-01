import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocationCard } from "./locationCard";
import { useEffect, useRef, useState } from "react";
import { LocationsResult } from "./locationsResults";
import { DataSource } from "./dataSource";

export function LocationsScrollView() {
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

    //para referenciar el FlatList
    const FlatListRef = useRef(null);

    const dataSource = new DataSource();

    const handleEndRached = () => {
        //si no hay pagina siguinete
        //o esta cargando no hace nd
        //caso contrario incrementar pagina

        // if(data.info.next || loading){
        //     return;
        // }
        // setPage(page + 1);

        //forma 2
        if(data.info.next && !loading){
            setPage(page + 1);
        }
    }

    

    useEffect(() => {
        setLoading(true);

        dataSource
            .getLocations(page)
            .then((result) => {

                //la clave es conservar los personajes
                //conservar el estado actual
                setData((prevData) => ({
                    results: [...prevData.results, ...result.results],
                    info: result.info,
                }));
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
            
            <View style={styles.paginator}>
                <View style={styles.pageInfo}>
                    <Text style={styles.nav}>Localizaciones</Text>
                    <Text style={styles.nav}>{data.results.length}</Text>
                    <Text style={styles.nav}>de</Text>
                    <Text style={styles.nav}>{data.info.count}</Text>
                </View>
            </View> 

            {/* Indicador de carga */}
            {loading && <ActivityIndicator size="large" style={styles.loader} />}

            {/* Lista de tarjetas */}
            <FlatList
                ref={FlatListRef}
                data={data.results}
                renderItem={({ item }) => <LocationCard location={item} />}
                keyExtractor={(item) => item.id.toString()}

                onEndReached={handleEndRached}
                onEndReachedThreshold={0.5}
                refreshing={loading}
                ListFooterComponent={loading ? <ActivityIndicator size="large"/> : undefined}
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
