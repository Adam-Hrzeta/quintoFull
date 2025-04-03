// notesView.tsx
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Datasource } from './dataSource';
import { useEffect, useState } from 'react';
import { Note } from './note';
import NotesCard from './notesCard';
import { NoteModal } from './notesModal';
import { supabase } from '@/lib/supabase'; // Add this import

export function NotesView() {
  const dataSource = new Datasource();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddModal = () => {
    setSelected({
      id: 0,
      title: "",
      text: "",
      date: new Date(),
    });
  };

  const onSaveNote = async (note: Note) => {
    try {
      const result = await dataSource.saveNote(note);
      if (result === null) {
        Alert.alert("Error", "No se pudo guardar la nota");
        return;
      }
      if (note.id === 0) {
        setNotes([result, ...notes]);
      } else {
        setNotes(notes.map(item => item.id === note.id ? result : item));
      }
      setSelected(null);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar la nota");
    }
  };

  const onDeleteNote = async (id: number) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar la nota");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const results = await dataSource.getNotes();
        setNotes(results);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar las notas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando notas...</Text>
        </View>
      ) : notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No hay notas disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <NotesCard
              data={item}
              onDelete={() => onDeleteNote(item.id)}
              onEdit={() => setSelected(item)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddModal}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selected && (
        <NoteModal
          open={!!selected}
          note={selected}
          onClose={() => setSelected(null)}
          onSaved={onSaveNote}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});