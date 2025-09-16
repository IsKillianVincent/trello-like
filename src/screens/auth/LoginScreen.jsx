import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import stylesAuth from '../../styles/Auth';
import ShimmerImage from '../../components/ShimmerImage';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage("L'email et le mot de passe sont requis.");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const login = () => {
    if (!validateForm()) return;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigation.navigate('Main');
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
      });
  };

  const resetPassword = () => {
    if (!email) {
      setErrorMessage("Veuillez entrer votre adresse email pour réinitialiser votre mot de passe.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email de réinitialisation envoyé.");
      })
      .catch(error => {
        setErrorMessage("Erreur lors de la réinitialisation du mot de passe.");
        console.error(error); 
      });
  };


  return (
    <View style={stylesAuth.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#8ac437"/>
      ) : (
        <>
          <ShimmerImage
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/trello-rn-v2.appspot.com/o/assets%2Fboard.jpg?alt=media&token=91fbc22c-a487-46d5-9571-9468f1f9e69c',
            }}
            style={stylesAuth.image}
          />
          <TextInput
            testID="email-input"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={stylesAuth.input}
          />
          <TextInput
            testID="password-input"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={stylesAuth.input}
          />
          <TouchableOpacity testID="login-button" style={stylesAuth.buttonPrimary} onPress={login}>
            <Text style={stylesAuth.buttonPrimaryText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetPassword}>
            <Text style={stylesAuth.link}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
          {errorMessage ? <Text style={stylesAuth.errorText}>{errorMessage}</Text> : null}
        </>
      )}
    </View>
  );
}
