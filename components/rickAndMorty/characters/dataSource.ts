//dataSource.ts

import { CharactersResult } from "./charactersResults"

export class DataSource{
    constructor(){}
    //metodo para cargar personajes
    async getCharacters(page: number) : Promise<CharactersResult> {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)

        return response.json();
        
    }
}