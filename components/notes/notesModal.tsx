import { Modal, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from "react-native";
import { Note } from "./note";
import { useState } from "react";

type Props = {
    note: Note,
    open: boolean,
    onSaved: (note : Note) => void;
    onClose: () => void;
}

export function NoteModal({
    note,
    open,
    onSaved,
    onClose,
} : Props) {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSave = () => {
        //si no hay nota a editar, no reaccionar
        if(!note) return;
        //se enviara la nota al componente padre
        onSaved({
            ...note, //tomar lo que se resive de note
            title, //enviar el nuevo vlor a title
            text,//enviar el nuevo valor en text
        });
    }

    return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
            onRequestClose={() => {
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                        placeholder="titulo de la nota"
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <TextInput
                        placeholder="Texto de la nota"
                        style={styles.input}
                        multiline
                        value={text}
                        onChangeText={setText}
                    />

                    <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    >
                        <Text style={styles.buttonText}>guardar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 5,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});