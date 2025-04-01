import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type Props = {
    onCancel : () => void;
    onTakePicture: (uri?: string) => void;
}

/**
 * 
 * Componente para tomar foto
 * @returns 
 */

export function CameraComponent(
  { onCancel, onTakePicture }: Props
) {
  const [facing, setFacing] = useState<CameraType>('back');
  const ref = useRef<CameraView>(null); 
  const [permission, requestPermission] = useCameraPermissions();


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos permiso para tomar fotos</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      onTakePicture(photo.uri); // Solo se llama si photo.uri está definido
    } else {
      console.warn("No se pudo capturar la foto.");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture}>
            <Ionicons name="camera" size={64} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
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
  iconButton: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});