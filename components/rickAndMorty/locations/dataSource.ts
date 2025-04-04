//dataSource.ts

import { LocationsResult } from "./locationsResults"

export class DataSource{
    constructor(){}
    //metodo para cargar personajes
    async getLocations(page: number) : Promise<LocationsResult> {
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)

        return response.json();
        
    }
}