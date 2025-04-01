import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
    uri: string;
    onSave: (uri : string) => void;
    onCancel: () => void;
    newPhoto: () => void;
}

export function PhotoPreview({
  uri,
  onSave,
  onCancel,
  newPhoto,
} : Props) {

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={{
          width: "100%",
          aspectRatio: 1,
          objectFit: "contain",
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={onCancel}
        >
          <Ionicons 
            name="close"
            size={32} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => onSave(uri)}>
          <Ionicons 
            name="save" // Cambiado de "camera" a "save"
            size={64}
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={newPhoto}>
            <Ionicons 
              name="camera-reverse-outline" 
              size={32} 
              color="white" 
            />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: 'transparent',
  position: 'absolute',
  bottom: 30, 
  left: 0,
  right: 0,
  paddingHorizontal: 20,
},
container: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'black',
},
});