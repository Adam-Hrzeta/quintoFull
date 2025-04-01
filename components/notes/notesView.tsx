//notesView.tsx

/*
implementa un componente que tenga: genere a partir de un array de strings, una lista con estos textos
nota 1
nota 2
nota 3
nota 4
*/

import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Modal } from 'react-native';
import { Datasource } from './dataSource';
import { useEffect, useState } from 'react';
import { Note } from './note';
import NotesCard from './notesCard';
import { NoteModal } from './notesModal';

export function NotesView() {
  
  const dataSource = new Datasource();
  //implementa un estado para notas, que sea tipo note
  const [notes, setNotes] = useState<Note[]>([])
  //estado donde estara la nota a editar/crear
   const[selected, setSelected] = useState<Note | null>(null);
  
  const handleAddModal = () => {
    //generar la nueva nota
    setSelected({
      id: 0,
      title:"",
      text: "",
      date: new Date(),
    });
  };

  const onSaveNote = (note: Note) => {
    dataSource.saveNote(note)
    .then((result) => {
      //identificar si la nota es nueva
      if (result === null){
        Alert.alert("No se pudo guardar la nueva nota");
        return;
      }
        //colocar la nueva nota al inicio
       if(note.id === 0){
        setNotes([result, ...notes]);
       } else{
       setNotes(
        notes
        .map((item) => item.id === note.id ? result : item)
       );
      }
    })
  }

  // Array de notas definido dentro del componente
  //const notes = ["nota 1", "nota 2", "nota 3", "nota 4"];

  useEffect(() => {
    dataSource.getNotes()
    .then((results) => {
      setNotes(results);
    })
    .catch((error) => {
      Alert.alert(`error: ${error.message}`);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NotesCard
            key={item.id}
            data={item}
            onDelete={() => {}}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity
      style={styles.addButton}
      onPress={handleAddModal}
      >
      <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>


      <NoteModal
          open={!!selected}
          note={selected} 
          onClose={() => setSelected(null)} 
          onSaved={onSaveNote}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1, 
  },
  notesCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFFFFF', 
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0', 
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