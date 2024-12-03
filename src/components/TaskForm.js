import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      dispatch(addTask({ id: Date.now(), title, description, completed: false }));
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;
