import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    icon: any,
    title: string,
    granted: boolean,
    requestPermission: () => void,
}

export function PermissionLayout({icon, title, granted, requestPermission} : Props) {
    return (
        <View style={styles.root}>
            <Ionicons name={icon} size={32} style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
            {granted ? (
                <Ionicons name="checkmark-outline" size={24} color={"green"} />
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={requestPermission} 
                >
                    <Text style={styles.buttonText}>Autorizar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center", 
        gap: 8,
        padding: 8, 
    },
    icon: {
        marginRight: 8, 
    },
    title: {
        fontSize: 16,
        flex: 1, 
    },
    button: {
        backgroundColor: "purple",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    buttonText: {
        color: "#FFFFFF", 
        fontSize: 14,
    }
});