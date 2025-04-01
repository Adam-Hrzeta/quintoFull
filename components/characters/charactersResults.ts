//charactersResult.ts
import { Character } from "./characterType"

/*Definir el tipo de dato que 
devuleve el endpoint de characters
*/

export type CharactersResult = {
    info:{
        pages: number,
        count: number,
        next: string | null,
        prev: string | null,
    },
    results: Character[];
}