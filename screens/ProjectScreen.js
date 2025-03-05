import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import { LightColors, DarkColors } from '../constants/Colors';

const ProjectScreen = ({ navigation }) => {
  const { projects, selectProject, theme } = useContext(AppContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;

  const renderProject = ({ item }) => (
    <TouchableOpacity style={[styles.projectItem, { borderColor: colors.border }]} onPress={() => {
      selectProject(item.id);
      navigation.goBack();
    }}>
      <Text style={{ color: colors.text }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList 
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderProject}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1 },
  projectItem: {
    padding: 12,
    borderWidth:1,
    borderRadius:4,
    marginBottom: 8,
  },
});

export default ProjectScreen;
