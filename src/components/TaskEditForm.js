import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { editTask } from '../features/tasks/tasksSlice';

const TaskEditForm = ({ task, setEditingTaskId }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({ id: task.id, updates: { title, description, dueDate } }));
    setEditingTaskId(null);  // Close the edit form after saving
  };

  return (
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
      <TextField
        label="Due Date"
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Save Changes
      </Button>
    </Box>
  );
};

export default TaskEditForm;
