// locationDatasource.ts
import { db } from "../../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function saveLocation(latitude: number, longitude: number) {
    try {
        const docRef = await addDoc(collection(db, "locations"), {
            latitude,
            longitude,
            timestamp: new Date()
        });
        console.log("Location saved with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}

