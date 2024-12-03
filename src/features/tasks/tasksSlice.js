import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, updates } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      Object.assign(task, updates);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      task.completed = !task.completed;
    },
    filterTasks: (state, action) => {
      state.filter = action.payload;
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks.splice(sourceIndex, 1); // Remove the task from the source position
      state.tasks.splice(destinationIndex, 0, removed); // Insert the task into the destination position
    },
  },
});

export const { addTask, editTask, deleteTask, toggleComplete, filterTasks, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
