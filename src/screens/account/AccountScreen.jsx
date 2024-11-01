import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Alert, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../../config/firebase';
import { deleteUser, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CustomListItem from '../../components/CustomListItem';
import { useNavigation } from '@react-navigation/native';
import CustomListSwitch from '../../components/CustomListSwitch';
import CustomListButton from '../../components/CustomListButton';
import { Linking } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import stylesAccount from '../../styles/Account';

export default function AccountScreen() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');

  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || 'Utilisateur');
        setUsername(currentUser.email.split('@')[0]);
        if (currentUser.photoURL) {
          setSelectedImage(currentUser.photoURL);
        }
      }
    });
    return unsubscribe;
  }, []);
  const sendSupportEmail = () => {
    const email = "killian.vincent@livecampus.tech";
    const subject = "Signalement de bug";
    const body = "Veuillez décrire votre problème ici.";

    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailUrl).catch(err => console.error('Error launching email client', err));
  };


  const getInitials = (name) => {
    if (!name) return 'UT';
    const initials = name.split(' ').map(part => part[0]).join('');
    return initials.toUpperCase();
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission requise", "Vous devez autoriser l'accès à la galerie pour changer l'avatar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      uploadImage(uri);
    } else {
      Alert.alert("Image non sélectionnée ou annulée");
    }
  };


  const uploadImage = async (uri) => {
    if (!uri) {
      console.error("URI de l'image non défini.");
      return;
    }

    console.log("URI sélectionné :", uri);
    try {
      setLoading(true);

      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `avatars/${user.uid}`);

      const snapshot = await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(snapshot.ref);

      await updateProfile(user, { photoURL: downloadURL });

      setSelectedImage(downloadURL);
      setLoading(false);
      Alert.alert("Avatar mis à jour", "Votre avatar a été mis à jour avec succès.");
    } catch (error) {
      setLoading(false);
      Alert.alert("Erreur", "Impossible de téléverser l'image : " + error.message);
    }
  };

  const formatCreationDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const logout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Presentation');
    });
  };

  const deleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            const user = auth.currentUser;
            deleteUser(user)
              .then(() => {
                Alert.alert("Compte supprimé", "Votre compte a été supprimé avec succès.");
                navigation.navigate('Presentation');
              })
              .catch(error => {
                Alert.alert("Erreur", "Impossible de supprimer le compte : " + error.message);
              });
          },
          style: "destructive",
        }
      ]
    );
  };

  return (
    <SafeAreaView style={stylesAccount.container}>
      {user ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={stylesAccount.profileSection}>
              <TouchableOpacity onPress={pickImage}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={stylesAccount.avatar} />
                ) : (
                  <View style={[stylesAccount.avatar, stylesAccount.initialsContainer]}>
                    <Text style={stylesAccount.initialsText}>{getInitials(displayName)}</Text>
                  </View>
                )}
              </TouchableOpacity>
              {loading &&
                <View>
                  <Text>Chargement en cours...</Text>
                </View>
              }
              <Text style={stylesAccount.displayName}>{displayName}</Text>
              <Text style={stylesAccount.username}>@{username}</Text>
              <Text style={stylesAccount.email}>{user.email}</Text>
              <Text style={stylesAccount.joinDate}>
                Utilisateur Trullo depuis {formatCreationDate(user.metadata.creationTime)}
              </Text>
            </View>

            <View style={stylesAccount.section}>
              <Text style={stylesAccount.sectionTitle}>Compte</Text>
              <CustomListItem
                title="Mettre à jour le profil"
                iconName="edit"
                iconColor="gray"
                onPress={() => navigation.navigate('UpdateProfileScreen')}
              />

              <CustomListButton
                title="Déconnexion"
                iconName="logout"
                iconColor="gray"
                onPress={logout}
                isInfo={true}
              />
              <CustomListButton
                title="Supprimer le compte"
                iconName="delete"
                iconColor="red"
                onPress={deleteAccount}
                isDanger={true}
              />
            </View>

            {/* <View style={stylesAccount.section}>
              <Text style={stylesAccount.sectionTitle}>Apparence</Text>

              <CustomListItem
                title="Définir l'icône de l'application"
                iconName="inbox"
                iconType="material-community"
                iconColor="grey"
                onPress={() => navigation.navigate('IconPicker')}
              />
              <CustomListSwitch
                title="Mode Sombre"
                iconName={isDarkMode ? "dark-mode" : "light-mode"}
                iconColor="grey"
                isSwitchOn={isDarkMode}
                onSwitchToggle={handleToggleDarkMode}
              />
              <CustomListItem
                title="Préférences linguistiques"
                iconName="language"
                iconColor="gray"
                onPress={() => navigation.navigate('LanguageSettingsScreen')}
              />
            </View>

            <View style={stylesAccount.section}>
              <Text style={stylesAccount.sectionTitle}>Accessibilité</Text>
              <CustomListSwitch
                title="Mode daltonien"
                iconName="visibility"
                iconColor="grey"
                isSwitchOn={isDaltonianMode}
                onSwitchToggle={() => setIsDaltonianMode(!isDaltonianMode)}
              />
            </View> */}

            <View style={stylesAccount.section}>
              <CustomListButton
                title="Signaler un problème"
                iconName="support"
                iconColor="gray"
                onPress={sendSupportEmail}
                isInfo={true}
              />
            </View>
            <Text style={stylesAccount.version}>v 1.0.0</Text>
          </ScrollView>
        </>
      ) : (
        <Text>Veuillez vous connecter pour accéder à votre compte.</Text>
      )}
    </SafeAreaView>
  );
}

