import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function LanguageSettingsScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    Alert.alert("Langue mise à jour", "Votre langue a été mise à jour en " + language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Préférences linguistiques</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => changeLanguage(itemValue)}
      >
        <Picker.Item label="Français" value="fr" />
        <Picker.Item label="Anglais" value="en" />
      </Picker>
    </View>
  );
}
