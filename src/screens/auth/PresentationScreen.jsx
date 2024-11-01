import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { stylesAuth } from '../../styles/Auth';
import * as Linking from 'expo-linking';
import ShimmerImage from '../../components/ShimmerImage';

export default function PresentationScreen({ navigation }) {

  const handleOpenAvis = () => {
    Linking.openURL('https://www.atlassian.com/legal/privacy-policy#what-this-policy-covers');
  };

  const handleOpenPrivacyPolicy = () => {
    Linking.openURL('https://www.atlassian.com/legal/privacy-policy#what-this-policy-covers');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:killian.vincent@livecampus.tech?subject=Problème de connexion/inscription&body=Bonjour,');
  };

  return (
    <View style={[stylesAuth.container]}>
      <Text style={[stylesAuth.title]}>Trello like</Text>

      <ShimmerImage
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/trello-rn-v2.appspot.com/o/assets%2Fwelcome.jpg?alt=media&token=c59c24d4-3fe1-4b26-ac5c-a0e447891342',
        }}
        style={stylesAuth.image}
      />

      <TouchableOpacity style={stylesAuth.buttonPrimary} onPress={() => navigation.navigate('Login')}>
        <Text style={stylesAuth.buttonPrimaryText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesAuth.buttonSecondary} onPress={() => navigation.navigate('SignIn')}>
        <Text style={stylesAuth.buttonSecondaryText}>S’inscrire</Text>
      </TouchableOpacity>

      <Text style={stylesAuth.footer}>
        En vous inscrivant, vous acceptez
        <Text style={stylesAuth.link} onPress={handleOpenAvis}> l’Avis aux utilisateurs</Text> et la
        <Text style={stylesAuth.link} onPress={handleOpenPrivacyPolicy}> Politique de confidentialité</Text>.
      </Text>
      <TouchableOpacity onPress={handleEmailSupport}>
        <Text style={stylesAuth.link}>
          Vous n’arrivez pas à vous connecter ou à vous inscrire ?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
