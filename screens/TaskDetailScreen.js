import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { LightColors, DarkColors } from '../constants/Colors';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { selectedProject, updateTask, theme } = useContext(AppContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;

  const task = selectedProject.tasks.find(t => t.id === taskId);
  const [description, setDescription] = useState(task ? task.description : '');

  if (!task) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Task not found</Text>
      </View>
    );
  }

  const handleSave = () => {
    updateTask(taskId, { description });
    Alert.alert("Saved", "Task updated successfully.");
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
      <Text style={{ color: colors.text, marginVertical: 8 }}>
        Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "None"}
      </Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Task Description"
        placeholderTextColor={colors.text}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
        <Text style={{ color: '#fff' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  input: {
    borderWidth:1,
    borderRadius:4,
    padding:8,
    height: 150,
    textAlignVertical: 'top'
  },
  saveButton: {
    marginTop:16,
    padding:12,
    borderRadius:4,
    alignItems:'center'
  }
});

export default TaskDetailScreen;
