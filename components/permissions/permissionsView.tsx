import { StyleSheet, Text, View } from "react-native";
import { CameraPermission } from "./cameraPermission";
import { GalleryPermission } from "./galleryPermission";
import { MicrofonePermission } from "./microphonePermission";
import { LocationPermission } from "./locationPermission";
import { ContactPermission } from "./contactPermission";
import { CalendarPermission } from "./calendarPermission";

export function PermissionView(){

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Permisos</Text>
      <View>
        <CameraPermission/>
        <GalleryPermission/>
        <MicrofonePermission/>
        <LocationPermission/>
        <ContactPermission/>
        <CalendarPermission/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    height: "100%",
    backgroundColor: "#FFF",
    padding: 30,
    paddingHorizontal: 16,
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
  },
  content:{
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  }
});