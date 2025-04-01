//charactersResult.ts
import { Episode } from "./episodeType"

/*Definir el tipo de dato que 
devuleve el endpoint de characters
*/

export type EpisodesResult = {
    info:{
        pages: number,
        count: number,
        next: string | null,
        prev: string | null,
    },
    results: Episode[];
}