import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesList from '../styles/StylesList';

const CustomListButton = ({ title, iconName, iconColor = 'grey', onPress, isDanger = false, isInfo = false }) => {
  const textColorStyle = isDanger ? stylesList.txtDanger : isInfo ? stylesList.txtInfo : null;

  return (
    <TouchableOpacity style={stylesList.listItem} onPress={onPress}>
      <View style={stylesList.iconContainer}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>

      <View style={stylesList.textContainer}>
        <Text style={[stylesList.title, textColorStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomListButton;
