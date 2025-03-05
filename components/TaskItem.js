import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { LightColors, DarkColors } from '../constants/Colors';

const TaskItem = ({ task, onPress, theme }) => {
  const { toggleTaskCompleted } = useContext(AppContext);
  const colors = theme === 'dark' ? DarkColors : LightColors;
  const daysLeft = task.deadline ? Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 3600 * 24)) : null;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <TouchableOpacity onPress={() => toggleTaskCompleted(task.id)}>
        <MaterialIcons name={task.completed ? "check-box" : "check-box-outline-blank"} size={24} color={colors.primary} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text, textDecorationLine: task.completed ? 'line-through' : 'none' }]}>{task.title}</Text>
        {task.deadline && (
          <Text style={{ color: colors.text }}>
            Due: {new Date(task.deadline).toLocaleDateString()} {daysLeft !== null && `(in ${daysLeft} day${daysLeft !== 1 ? 's' : ''})`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TaskItem;
