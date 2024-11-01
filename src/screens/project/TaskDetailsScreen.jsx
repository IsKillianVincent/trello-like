import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../config/firebase';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import stylesProject from '../../styles/Project';

export default function TaskDetailsScreen({ route, navigation }) {
  const { task, projectId } = route.params;
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  const [media, setMedia] = useState(task.media || []);
  const [open, setOpen] = useState(false);
  const [taskDescription, setTaskDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchProjectColumns = async () => {
      try {
        const projectRef = doc(db, 'projects', projectId);
        const projectDoc = await getDoc(projectRef);
        if (projectDoc.exists()) {
          const columnsData = projectDoc.data().columns || [];
          console.log("Fetched columns:", columnsData);
          setColumns(columnsData.map((col) => ({ label: col, value: col })));
        } else {
          console.log("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project columns:", error);
      }
    };

    fetchProjectColumns();
  }, [projectId]);

  const updateDescription = async () => {
    try {
      const taskRef = doc(db, 'projects', projectId, 'tasks', task.id);
      await updateDoc(taskRef, { description: taskDescription });
      Alert.alert('Succès', 'Description mise à jour avec succès!');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour la description.');
    }
  };

  const deleteTask = async () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'projects', projectId, 'tasks', task.id));
              Alert.alert('Succès', 'Tâche supprimée avec succès !');
              navigation.goBack();
            } catch (error) {
              console.error('Erreur lors de la suppression de la tâche :', error);
              Alert.alert('Erreur', 'Impossible de supprimer la tâche, veuillez réessayer.');
            }
          }
        }
      ]
    );
  };

  const handleStatusChange = async (newStatus) => {
    console.log('Selected status:', newStatus);

    if (!columns.find(column => column.value === newStatus)) {
      console.warn(`Invalid status selected: ${newStatus}`);
      return;
    }

    if (!projectId) {
      console.error('Error: projectId is undefined');
      Alert.alert('Error', 'Project ID is undefined.');
      return;
    }

    setLoading(true);

    try {
      const taskRef = doc(db, 'projects', projectId, 'tasks', task.id);
      await updateDoc(taskRef, { status: newStatus });
      setSelectedStatus(newStatus);
      Alert.alert('Success', 'Task status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'Failed to update task status. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const handleMediaPick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadMedia(result.assets[0].uri);
    }
  };

  const uploadMedia = async (uri) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `tasks/${task.id}/${filename}`);
    const response = await fetch(uri);
    const blob = await response.blob();

    uploadBytes(storageRef, blob).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(snapshot.ref);

      const taskRef = doc(db, 'projects', projectId, 'tasks', task.id);
      await updateDoc(taskRef, {
        media: [...media, { type: uri.endsWith('.mp4') ? 'video' : 'image', url: downloadURL }]
      });

      setMedia(prevMedia => [...prevMedia, { type: uri.endsWith('.mp4') ? 'video' : 'image', url: downloadURL }]);
      Alert.alert('Success', 'Media uploaded successfully!');
    }).catch((error) => {
      console.error('Error uploading media:', error);
      Alert.alert('Error', 'Failed to upload media. Please try again.');
    });
  };

  const deleteMedia = (index) => {
    Alert.alert(
      'Confirmer la suppression',
      'Voulez-vous supprimer ce média?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: async () => {
            const updatedMedia = media.filter((_, i) => i !== index);
            setMedia(updatedMedia);
            await updateDoc(doc(db, 'projects', projectId, 'tasks', task.id), {
              media: updatedMedia,
            });
          }
        }
      ]
    );
  };

  return (
    <View style={stylesProject.container}>
      <Text style={stylesProject.title}>{task.name}</Text>

      <TextInput
        placeholder="Modifier la description..."
        value={taskDescription}
        onChangeText={setTaskDescription}
        style={stylesProject.input}
      />

      <DropDownPicker
        open={open}
        value={selectedStatus}
        items={columns}
        setOpen={setOpen}
        setValue={setSelectedStatus}
        setItems={setColumns}
        onChangeValue={handleStatusChange}
        style={stylesProject.dropdown}
        dropDownContainerStyle={stylesProject.dropdownContainer}
        disabled={loading}
      />

      {loading && <Text style={stylesProject.loadingText}>Updating status...</Text>}

      <ScrollView style={stylesProject.mediaContainer} contentContainerStyle={stylesProject.mediaContent} horizontal={true}>
        {media && media.map((mediaItem, index) => (
          <View key={index} style={stylesProject.mediaWrapper}>
            {mediaItem.type === 'image' ? (
              <Image source={{ uri: mediaItem.url }} style={stylesProject.image} />
            ) : (
              <Video source={{ uri: mediaItem.url }} style={stylesProject.video} resizeMode="contain" shouldPlay={false} />
            )}
            <View style={stylesProject.iconContainer}>
              <TouchableOpacity onPress={() => deleteMedia(index)}>
                <Icon name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={stylesProject.button} onPress={updateDescription}>
        <Text style={stylesProject.buttonText}>Mettre à jour la description</Text>
      </TouchableOpacity>

      <View style={stylesProject.projectButtons}>
        <TouchableOpacity style={[stylesProject.button, stylesProject.taskButton]} onPress={handleMediaPick}>
          <Text style={stylesProject.buttonText}>Ajouter Image/Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesProject.button, stylesProject.deleteButton, stylesProject.deleteButtonWrapper]} onPress={deleteTask}>
          <Text style={stylesProject.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
