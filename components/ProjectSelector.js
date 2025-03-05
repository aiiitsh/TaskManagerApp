import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import { LightColors, DarkColors } from '../constants/Colors';

const ProjectSelector = ({ navigation, theme }) => {
  const { selectedProject } = useContext(AppContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;
  return (
    <TouchableOpacity style={[styles.container, { borderColor: colors.border }]} onPress={() => navigation.navigate('Projects')}>
      <Text style={{ color: colors.text }}>{selectedProject ? selectedProject.name : 'Select Project'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
  },
});

export default ProjectSelector;
