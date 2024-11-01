import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCheckbox from '../styles/Checkbox';

export default function IconCheckbox({ initialIcon, onSelectIcon }) {
  const [selectedIcon, setSelectedIcon] = useState(initialIcon || 'default');

  const handleIconChange = (value) => {
    setSelectedIcon(value);
  };

  const renderIconOption = (label, value, IconComponent, iconName) => (
    <TouchableOpacity
      style={stylesCheckbox.checkboxContainer}
      onPress={() => handleIconChange(value)}
    >
      <View style={stylesCheckbox.iconPreview}>
        <IconComponent name={iconName} size={24} color={selectedIcon === value ? '#8ac437' : 'grey'} />
      </View>
      <Text style={ selectedIcon === value ? stylesCheckbox.checkboxSelectedLabel : stylesCheckbox.checkboxLabel}>{label}</Text>
      <View style={stylesCheckbox.checkbox}>
        {selectedIcon === value ? (
          <Icon name="check" size={24} color="#8ac437" />
        ) : (
          <Icon name="check" size={24} color="transparent" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={stylesCheckbox.container}>
      <Text style={stylesCheckbox.title}>Sélectionner une icône d'application :</Text>
      <View style={stylesCheckbox.checkboxContainers}>
      {renderIconOption('Icône par défaut', 'default', FontAwesome, 'home')}
      {renderIconOption('Icône blanche', 'white', FontAwesome, 'rocket')}
      {renderIconOption('Icône noire 2', 'dark', FontAwesome, 'star')}
      </View>
    </View>
  );
}
