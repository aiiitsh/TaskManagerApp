import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import { LightColors, DarkColors } from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OptionsScreen = () => {
  const { theme, setTheme } = useContext(AppContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;

  const toggleSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="weather-sunny" size={24} color={colors.text} />
        <Text style={[styles.label, { color: colors.text }]}>Light Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleSwitch}
        />
        <MaterialCommunityIcons name="weather-night" size={24} color={colors.text} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, padding:16, justifyContent:'center', alignItems:'center' },
  row: { flexDirection:'row', alignItems:'center' },
  label: { marginHorizontal: 8, fontSize: 16 },
});

export default OptionsScreen;
