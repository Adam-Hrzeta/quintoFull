import { useMicrophonePermissions } from "expo-camera";
import { PermissionLayout } from "./permissionLayout";

export function MicrofonePermission(){
    const [permission, requestPermission] = useMicrophonePermissions();
    
    return (
        <PermissionLayout 
        icon ="mic"
        title="Microfono"
        granted={permission?.granted || false}
        requestPermission={requestPermission}
        />
    );
}