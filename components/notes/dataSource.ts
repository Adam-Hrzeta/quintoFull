import { supabase } from "@/lib/supabase";
import { Note } from "./note";

export class Datasource {
    constructor() {}

    async getNotes(): Promise<Note[]> {
        try {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
                .order('date', { ascending: false }); // Ordenar por 'date' en lugar de 'created_at'

            if (error) throw error;
            
            // Convertir las fechas de string a Date
            return data?.map(note => ({
                ...note,
                date: new Date(note.date)
            })) || [];
        } catch (error) {
            console.error('Error fetching notes:', error);
            return [];
        }
    }

    async saveNote(note: Note): Promise<Note | null> {
        try {
            // Preparar los datos para Supabase
            const noteData = {
                title: note.title,
                text: note.text,
                date: note.date.toISOString(), // Convertir Date a string ISO
                // No incluir id si es 0 (nueva nota)
                ...(note.id !== 0 && { id: note.id })
            };

            const operation = note.id === 0 
                ? supabase.from('notes').insert([noteData])
                : supabase.from('notes').update(noteData).eq('id', note.id);

            const { data, error } = await operation.select().single();

            if (error) throw error;

            // Convertir la fecha de vuelta a Date
            return {
                ...data,
                date: new Date(data.date)
            };
        } catch (error) {
            console.error('Error saving note:', error);
            return null;
        }
    }
}