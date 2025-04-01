// Importamos el componente PermissionLayout y el módulo MediaLibrary de Expo
import { PermissionLayout } from "./permissionLayout";
import * as MediaLibrary from 'expo-media-library';

// Definimos el componente GalleryPermission
export function GalleryPermission(){
    // Usamos el hook usePermissions de MediaLibrary para obtener y solicitar permisos
    const [permission, requestPermission] = MediaLibrary.usePermissions();

    return (
        // Renderizamos el componente PermissionLayout con las propiedades necesarias
        <PermissionLayout 
            icon="images-outline" // Icono que representa la galería
            title="galeria" // Título que se muestra en la pantalla
            granted={permission?.granted || false} // Estado del permiso (concedido o no)
            requestPermission={requestPermission} // Función para solicitar el permiso
        />
    );
}