import React, { createContext, useState } from 'react';
import uuid from 'react-native-uuid';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    {
      id: uuid.v4(),
      name: 'Default Project',
      tasks: [
        {
          id: uuid.v4(),
          title: 'Sample Task',
          description: '',
          deadline: null,
          completed: false,
          createdAt: new Date(),
        },
      ],
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const addProject = (name) => {
    const newProject = {
      id: uuid.v4(),
      name,
      tasks: [],
    };
    setProjects([...projects, newProject]);
    setSelectedProjectId(newProject.id);
  };

  const addTask = (title, deadline = null) => {
    const newTask = {
      id: uuid.v4(),
      title,
      description: '',
      deadline: deadline ? new Date(deadline) : null,
      completed: false,
      createdAt: new Date(),
    };
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return { ...project, tasks: [...project.tasks, newTask] };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const updateTask = (taskId, updatedFields) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, ...updatedFields };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const toggleTaskCompleted = (taskId) => {
    const task = selectedProject.tasks.find(t => t.id === taskId);
    if (!task) return;
    updateTask(taskId, { completed: !task.completed });
  };

  const selectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  return (
    <AppContext.Provider value={{
      projects,
      selectedProject,
      theme,
      setTheme,
      addProject,
      addTask,
      updateTask,
      toggleTaskCompleted,
      selectProject,
    }}>
      {children}
    </AppContext.Provider>
  );
};
