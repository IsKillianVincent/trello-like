import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function UpdateProfileScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;

    let promises = [];

    if (displayName) {
      Alert.alert(
        "Confirmer la mise à jour du nom",
        "Êtes-vous sûr de vouloir mettre à jour votre nom d'affichage ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Mettre à jour",
            onPress: async () => {
              try {
                await updateProfile(user, { displayName });
                Alert.alert("Succès", "Nom mis à jour avec succès");
                promises.push(Promise.resolve());
              } catch (error) {
                Alert.alert("Erreur", error.message);
              }
            },
          },
        ]
      );
    }

    if (newEmail && newEmail !== user.email) {
      Alert.alert(
        "Confirmer la mise à jour de l'email",
        "Êtes-vous sûr de vouloir mettre à jour votre adresse email ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Mettre à jour",
            onPress: async () => {
              try {
                await updateEmail(user, newEmail);
                Alert.alert("Succès", "Email mis à jour avec succès");
                promises.push(Promise.resolve());
              } catch (error) {
                Alert.alert("Erreur", error.message);
              }
            },
          },
        ]
      );
    }

    if (newPassword) {
      Alert.alert(
        "Confirmer la mise à jour du mot de passe",
        "Êtes-vous sûr de vouloir mettre à jour votre mot de passe ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Mettre à jour",
            onPress: async () => {
              try {
                await updatePassword(user, newPassword);
                Alert.alert("Succès", "Mot de passe mis à jour avec succès");
                promises.push(Promise.resolve());
              } catch (error) {
                Alert.alert("Erreur", error.message);
              }
            },
          },
        ]
      );
    }

    try {
      await Promise.all(promises);
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mettre à jour les informations de profil</Text>

      <TextInput
        placeholder="Nouveau nom d'affichage"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nouvel email"
        value={newEmail}
        onChangeText={setNewEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Nouveau mot de passe"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      
      <Button title="Mettre à jour" onPress={handleUpdateProfile} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
