//dataSource.ts
import { EpisodesResult } from "./episodesResults"

export class DataSource{
    constructor(){}
    //metodo para cargar personajes
    async getEpisodes(page: number) : Promise<EpisodesResult> {
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)

        return response.json();
        
    }
}