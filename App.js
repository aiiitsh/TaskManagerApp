import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider, AppContext } from './context/AppContext';
import { LightColors, DarkColors } from './constants/Colors';

import HomeScreen from './screens/HomeScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import OptionsScreen from './screens/OptionsScreen';
import ProjectScreen from './screens/ProjectScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  const { theme } = useContext(AppContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary, // Header background adapts to theme
        },
        // In light mode, set the header text to white; in dark mode, use the theme's text color
        headerTintColor: theme === 'light' ? '#fff' : colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Center the header title in light mode, left align otherwise
        headerTitleAlign: theme === 'light' ? 'center' : 'left',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
      <Stack.Screen name="Options" component={OptionsScreen} />
      <Stack.Screen name="Projects" component={ProjectScreen} options={{ title: 'Select Project' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
