import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// EntryApp
import PresentationScreen from '../screens/auth/PresentationScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignInScreen from '../screens/auth/SignInScreen';

// ProjectStack
import ProjectScreen from '../screens/project/ProjectScreen';
import TaskScreen from '../screens/project/TaskScreen';
import TaskDetailsScreen from '../screens/project/TaskDetailsScreen';
import ManageColumnsScreen from '../screens/project/ManageColumnsScreen';

// AccountStack
import AccountScreen from '../screens/account/AccountScreen';
import ThemeCheckbox from '../components/ThemeCheckbox';
import IconCheckbox from '../components/IconCheckbox';
import UpdateProfileScreen from '../screens/account/UpdateProfilScreen';
import LanguageSettingsScreen from '../screens/account/LanguageSettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Compte', headerShown: false }} />
      <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} options={{ title: 'Modifier le Profil', headerTintColor: '#000' }} />
      <Stack.Screen name="LanguageSettingsScreen" component={LanguageSettingsScreen} options={{ title: 'Langue', headerTintColor: '#000' }} />
      <Stack.Screen name="IconPicker" component={IconCheckbox} options={{ title: 'Icône', headerTintColor: '#000' }} />
      <Stack.Screen name="ThemePicker" component={ThemeCheckbox} options={{ title: 'Mode Dark', headerTintColor: '#000' }}/>
    </Stack.Navigator>
  );
}

function ProjectStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProjectList" component={ProjectScreen} options={{ title: 'Projets', headerShown: false }} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ title: 'Tâches', headerTintColor: '#000' }} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Détails de la tâche', headerTintColor: '#000' }} />
      <Stack.Screen name="ManageColumnsScreen" component={ManageColumnsScreen} options={{ title: 'Gérer les colonnes', headerTintColor: '#000' }} />

    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Projects'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Projects') {
            iconName = 'folder-open-outline';
          } else if (route.name === 'Account') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8ac437',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f8f8f8' },
      })}
    >
      <Tab.Screen name="Projects" component={ProjectStack} options={{ headerShown: false, title: 'Projets' }} />
      <Tab.Screen name="Account" component={AccountStack} options={{ headerShown: false, title: 'Compte' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Presentation">
        <Stack.Screen name="Presentation" component={PresentationScreen} options={{ title: 'Retour', headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Se connecter', headerTintColor: '#000' }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "S'inscrire", headerTintColor: '#000' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
