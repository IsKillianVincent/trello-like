import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../config/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import stylesProject from '../../styles/Project';

export default function ProjectScreen({ navigation }) {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), snapshot => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const addProject = async () => {
    if (newProject) {
      await addDoc(collection(db, 'projects'), 
      { name: newProject, 
        columns: ['Backlog', 'À faire', 'En cours', 'Fait'], });
      setNewProject('');
    }
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
  };

  const confirmDeleteProject = (id) => {
    Alert.alert(
      "Confirmation de suppression",
      "Êtes-vous sûr de vouloir supprimer ce projet ?",
      [
        {
          text: "Non",
          style: "cancel"
        },
        {
          text: "Oui",
          onPress: () => deleteProject(id)
        }
      ]
    );
  };

  return (
    <SafeAreaView style={stylesProject.projectScreenSafe}>
      <View style={stylesProject.projectScreenContainer}>
        <Text style={stylesProject.title}>Mes projets</Text>
        <TextInput
          placeholder="Nouveau projet"
          value={newProject}
          onChangeText={setNewProject}
          style={stylesProject.input}
        />
        <TouchableOpacity style={stylesProject.button} onPress={addProject}>
          <Text style={stylesProject.buttonText}>Ajouter Projet</Text>
        </TouchableOpacity>

        <FlatList
          data={projects}
          renderItem={({ item }) => (
            <View style={stylesProject.projectCard}>
              <Text style={stylesProject.projectTitle}>{item.name}</Text>
              <View style={stylesProject.projectButtons}>
                <TouchableOpacity
                  style={[stylesProject.button, stylesProject.taskButton]}
                  onPress={() => navigation.navigate('TaskScreen', { projectId: item.id })}
                >
                  <Text style={stylesProject.buttonText}>Voir les tâches</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[stylesProject.button, stylesProject.deleteButton, stylesProject.deleteButtonWrapper]}
                  onPress={() => confirmDeleteProject(item.id)}
                >
                  <Text style={stylesProject.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={stylesProject.button} onPress={() => navigation.navigate('ManageColumnsScreen', { projectId: item.id })}>
                <Text style={stylesProject.buttonText}>Gérer les colonnes</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
