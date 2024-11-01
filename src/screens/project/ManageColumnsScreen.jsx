import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import stylesProject from '../../styles/Project';

export default function ManageColumnsScreen({ route, navigation }) {
  const { projectId } = route.params;
  const [columns, setColumns] = useState([]);
  const [newColumn, setNewColumn] = useState('');

  useEffect(() => {
    const fetchColumns = async () => {
      const projectRef = doc(db, 'projects', projectId);
      const projectDoc = await getDoc(projectRef);
      if (projectDoc.exists()) {
        setColumns(projectDoc.data().columns || []);
      }
    };

    fetchColumns();
  }, [projectId]);

  const addColumn = async () => {
    if (newColumn && !columns.includes(newColumn)) {
      const updatedColumns = [...columns, newColumn];
      await updateDoc(doc(db, 'projects', projectId), { columns: updatedColumns });
      setColumns(updatedColumns);
      setNewColumn('');
    }
  };

  const deleteColumn = async (columnToDelete) => {
    const updatedColumns = columns.filter((col) => col !== columnToDelete);
    await updateDoc(doc(db, 'projects', projectId), { columns: updatedColumns });
    setColumns(updatedColumns);
  };

  return (
    <View style={stylesProject.container}>
      <Text style={stylesProject.title}>Gérer les colonnes</Text>

      <TextInput
        placeholder="Nouvelle colonne"
        value={newColumn}
        onChangeText={setNewColumn}
        style={stylesProject.input}
      />
      <TouchableOpacity style={stylesProject.button} onPress={addColumn}>
        <Text style={stylesProject.buttonText}>Ajouter Colonne</Text>
      </TouchableOpacity>

      <FlatList
        data={columns}
        renderItem={({ item }) => (
          <View style={stylesProject.columnContainer}>
            <Text style={stylesProject.columnText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteColumn(item)}>
              <Text style={stylesProject.deleteText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}
