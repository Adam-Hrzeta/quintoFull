import { useEffect, useState } from "react";
import { PermissionLayout } from "./permissionLayout";
import { getPermissionsAsync, PermissionResponse, requestPermissionsAsync } from "expo-contacts";

export function ContactPermission(){
    
    //estado para el permiso de contactos
    const[permission, setPermission] = useState<PermissionResponse | undefined>(undefined);

    //funcion para solicitar permiso acceso a contactos
    const requestPermission = () => {
        requestPermissionsAsync()
        .then((result) => {
            console.log(result)
            setPermission(result);
        });
    }
    
    //verificar el estatus del permiso
    useEffect(() => {
        getPermissionsAsync()
        .then((result) => {
            console.log(result)
            setPermission(result);
        });
    }, [])

    return (
        <PermissionLayout 
        icon ="call"
        title="Contactos"
        granted={permission?.granted || false}
        requestPermission={requestPermission}
        />
    );
}