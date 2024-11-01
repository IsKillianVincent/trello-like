import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import stylesAuth from '../../styles/Auth';
import ShimmerImage from '../../components/ShimmerImage';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!email || !password || password !== confirmPassword) {
      setErrorMessage("Les informations sont incomplètes ou incorrectes.");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const register = async () => {
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await sendEmailVerification(user);

      Alert.alert(
        "Vérification requise",
        "Un e-mail de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Main'),
          }
        ]
      );
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription : " + error.message);
    }
  };

  return (
    <View style={stylesAuth.container}>
      <ShimmerImage
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/trello-rn-v2.appspot.com/o/assets%2Flogin.jpg?alt=media&token=0db1a551-ddb2-4844-98ec-9c5aa712a8c8',
        }}
        style={stylesAuth.image}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={stylesAuth.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={stylesAuth.input}
      />
      <TextInput
        placeholder="Confirmation du mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={stylesAuth.input}
      />
      <TouchableOpacity style={stylesAuth.buttonPrimary} onPress={register}>
        <Text style={stylesAuth.buttonPrimaryText}>S'inscrire</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={stylesAuth.errorText}>{errorMessage}</Text> : null}
    </View>
  );
}
