import { PermissionResponse } from "expo-camera";
import { PermissionLayout } from "./permissionLayout";
import { useEffect, useState } from "react";
import { getCalendarPermissionsAsync, requestCalendarPermissionsAsync } from "expo-calendar";


export function CalendarPermission(){

    //estado para el permiso de contactos
    const[permission, setPermission] = useState<PermissionResponse | undefined>(undefined); 
    
    //funcion para solicitar permiso acceso a calendario
    const requestPermission = () => {
        requestCalendarPermissionsAsync()
        .then((result) => {
            console.log(result)
            setPermission(result);
        });
    }

    //verificar el estatus del permiso
    useEffect(() => {
        getCalendarPermissionsAsync()
        .then((result) => {
            console.log(result)
            setPermission(result);
        });
    }, [])

    return (
        <PermissionLayout 
        icon ="calendar"
        title="Calendario"
        granted={permission?.granted || false}
        requestPermission={requestPermission}
        />
    );
}


