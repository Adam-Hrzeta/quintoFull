// locationDatasource.ts
import { db } from "../../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchLocations() {
    try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locations: { latitude: number; longitude: number }[] = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            locations.push({
                latitude: data.latitude,
                longitude: data.longitude
            });
        });
        
        return locations;
    } catch (error) {
        console.error("Error fetching documents: ", error);
        throw error;
    }
}