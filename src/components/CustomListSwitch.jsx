import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesList from '../styles/StylesList';

const CustomListSwitch = ({ title, iconName, iconColor = 'grey', isSwitchOn, onSwitchToggle }) => {
  return (
    <TouchableOpacity style={stylesList.listItem} onPress={onSwitchToggle}>
      <View style={stylesList.iconContainer}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>

      <View style={stylesList.textContainer}>
        <Text style={stylesList.title}>{title}</Text>
      </View>

      <View style={stylesList.SwitchContainer}>
        <Switch value={isSwitchOn} onValueChange={onSwitchToggle} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomListSwitch;
