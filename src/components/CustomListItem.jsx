import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesList from '../styles/StylesList';

const CustomListItem = ({ title, iconName, iconColor = 'grey', onPress }) => {
  return (
    <TouchableOpacity style={stylesList.listItem} onPress={onPress}>
      <View style={stylesList.iconContainer}>
        <Icon name={iconName} size={24} color={iconColor} />
      </View>

      <View style={stylesList.textContainer}>
        <Text style={stylesList.title}>{title}</Text>
      </View>

      <View style={stylesList.chevronContainer}>
        <Icon name="chevron-right" size={24} color="grey" />
      </View>
    </TouchableOpacity>
  );
};

export default CustomListItem;
