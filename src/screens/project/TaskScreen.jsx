import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, FlatList } from 'react-native';

import { db, auth } from '../../config/firebase';
import { collection, addDoc, onSnapshot, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import stylesProject from '../../styles/Project';

export default function TaskScreen({ route, navigation }) {
  const { projectId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [projectName, setProjectName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchColumnsAndTasks = async () => {
      const projectRef = doc(db, 'projects', projectId);
      const projectDoc = await getDoc(projectRef);

      if (projectDoc.exists()) {
        const projectData = projectDoc.data();

        if (projectData.columns) {
          setColumns(projectData.columns);
        } else {
          console.warn("No columns found for this project, setting default columns.");
          setColumns(['Backlog', 'À faire', 'En cours', 'Fait']);
        }

        setProjectName(projectData.name);
      } else {
        console.error("No project found with the given ID.");
      }
    };

    const unsubscribeTasks = onSnapshot(
      collection(db, 'projects', projectId, 'tasks'),
      snapshot => {
        setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    fetchColumnsAndTasks();
    return unsubscribeTasks;
  }, [projectId]);

  const addTask = async () => {
    if (newTask.trim()) {
      try {
          const safeName = newTask.trim();
          const safeDesc = newTaskDescription.trim();
          await addDoc(collection(db, 'projects', projectId, 'tasks'), {
            name: safeName,
            description: safeDesc,
            status: 'Backlog',
            createdBy: auth.currentUser?.uid,
            createdAt: serverTimestamp(),
            media: [], 
        });
        setNewTask('');
        setNewTaskDescription('');
      } catch (error) {
        Alert.alert('Erreur', 'Échec de l’ajout de la tâche. Veuillez réessayer.');
      }
    } else {
      Alert.alert('Erreur', 'Le nom de la tâche ne peut pas être vide.');
    }
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      style={stylesProject.task}
      testID={`task-card-${item.id}`}
      onPress={() => navigation.navigate('TaskDetails', { task: item, projectId })}
    >
      <Text style={stylesProject.taskText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderStatusRow = (status) => {
    if (!status) return null;

    const filteredTasks = tasks.filter((task) => task.status === status);

    return (
      <View style={stylesProject.statusRowContainer} key={status}>
        <Text style={stylesProject.columnTitle}>{status}</Text>
        <FlatList
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={stylesProject.statusRow}
        />
      </View>
    );
  };

  return (
    <View style={stylesProject.taskScreenContainer}>
      <Text style={stylesProject.title}>{projectName}</Text>
      <TextInput
        testID="new-task-input" 
        placeholder="Nouvelle tâche... (ex: XTO-Add features)"
        value={newTask}
        onChangeText={setNewTask}
        style={stylesProject.input}
      />
      <TextInput
        testID="new-task-desc-input"
        placeholder="Description de la tâche..."
        value={newTaskDescription}
        onChangeText={setNewTaskDescription}
        style={stylesProject.input}
      />
      <TouchableOpacity testID="add-task-btn" style={stylesProject.button} onPress={addTask}>
        <Text style={stylesProject.buttonText}>Ajouter une tâche</Text>
      </TouchableOpacity>

      <View style={stylesProject.separator} />

      <View style={stylesProject.taskColumnsContainer}>
        {columns.map((status) => renderStatusRow(status))}
      </View>
    </View>
  );
}
