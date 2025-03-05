import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LightColors, DarkColors } from '../constants/Colors';

const AddButton = ({ onPress, theme }) => {
  const colors = theme === 'dark' ? DarkColors : LightColors;
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onPress}>
      <MaterialIcons name="add" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default AddButton;
