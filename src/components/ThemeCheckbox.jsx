import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../context/ThemeContext'; // Importer le contexte du thème

export default function ThemeCheckbox() {
  const { theme, setTheme } = useContext(ThemeContext); // Utiliser le contexte
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const isDarkMode = theme === 'dark';

  const handleThemeChange = (value) => {
    setSelectedTheme(value);
    setTheme(value); // Met à jour le contexte global du thème
  };

  const renderCheckbox = (label, value) => (
    <TouchableOpacity
      style={[
        styles.checkboxContainer,
        selectedTheme === value && styles.selectedCheckbox,
        isDarkMode ? styles.checkboxDark : styles.checkboxLight,
      ]}
      onPress={() => handleThemeChange(value)}
    >
      <View style={[styles.checkbox, isDarkMode ? styles.checkboxDark : styles.checkboxLight]}>
        {selectedTheme === value && (
          <Icon name="check" size={24} color={isDarkMode ? 'white' : 'black'} />
        )}
      </View>
      <Text style={[styles.checkboxLabel, isDarkMode ? styles.labelDark : styles.labelLight]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.title, isDarkMode ? styles.titleDark : styles.titleLight]}>
        Sélectionner un thème :
      </Text>
      <View style={styles.checkboxContainers}>
        {renderCheckbox('Auto', 'auto')}
        {renderCheckbox('Clair', 'light')}
        {renderCheckbox('Sombre', 'dark')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerLight: {
    backgroundColor: 'white',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  titleLight: {
    color: '#000',
  },
  titleDark: {
    color: '#FFF',
  },
  checkboxContainers: {
    flexDirection: 'column',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedCheckbox: {
    borderColor: '#007bff',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLight: {
    backgroundColor: '#ddd',
    borderColor: '#ccc',
  },
  checkboxDark: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  labelLight: {
    color: '#000',
  },
  labelDark: {
    color: '#FFF',
  },
});
