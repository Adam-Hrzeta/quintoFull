import { supabase } from "@/lib/supabase";
import { Note } from "./note";

export class Datasource{
    constructor(){}

     async getNotes() : Promise<Note[]>{

        //conectar a supabase y mostrar notas
        const { data, error } = await supabase
        .from('notes')
        .select('*')

        return data || [];
    }

    //funcion que guarda una nota
async saveNote(notes: Note) : Promise<Note | null>{
    const {data, error} = await supabase
    .from("notes")
    .upsert({
    ...notes
    })
    .single();
    if(error) return null;
    return data;
    }
    
}