import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import TaskItem from '../components/TaskItem';
import AddButton from '../components/AddButton';
import ProjectSelector from '../components/ProjectSelector';
import { LightColors, DarkColors } from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { selectedProject, addTask, addProject, theme } = useContext(AppContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = () => {
    if (isAddingTask) {
      if (!inputValue) {
        Alert.alert("Error", "Please enter task title.");
        return;
      }
      addTask(inputValue, deadline || null);
    } else {
      if (!inputValue) {
        Alert.alert("Error", "Please enter project name.");
        return;
      }
      addProject(inputValue);
    }
    setInputValue('');
    setDeadline('');
    setModalVisible(false);
  };

  const renderTask = ({ item }) => (
    <TaskItem 
      task={item} 
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })} 
      theme={theme}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <ProjectSelector navigation={navigation} theme={theme} />
        <TouchableOpacity onPress={() => navigation.navigate('Options')}>
          <MaterialIcons name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <FlatList 
        data={selectedProject ? selectedProject.tasks : []}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        contentContainerStyle={{ padding: 16 }}
      />
      <AddButton onPress={() => {
        Alert.alert(
          "Add",
          "What do you want to add?",
          [
            { text: "Add Task", onPress: () => { setIsAddingTask(true); setModalVisible(true); } },
            { text: "Add Project", onPress: () => { setIsAddingTask(false); setModalVisible(true); } },
            { text: "Cancel", style: 'cancel' }
          ]
        );
      }} theme={theme} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalContent, { borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>{isAddingTask ? "New Task" : "New Project"}</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              placeholder={isAddingTask ? "Task Title" : "Project Name"}
              placeholderTextColor={colors.text}
              value={inputValue}
              onChangeText={setInputValue}
            />
            {isAddingTask && (
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                placeholder="Deadline (YYYY-MM-DD) - optional"
                placeholderTextColor={colors.text}
                value={deadline}
                onChangeText={setDeadline}
              />
            )}
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={handleAdd}>
              <Text style={{ color: '#fff' }}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: colors.text }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderWidth:1,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center'
  },
  input: {
    borderWidth:1,
    borderRadius:4,
    padding:8,
    marginBottom: 12,
  },
  addButton: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
});

export default HomeScreen;
