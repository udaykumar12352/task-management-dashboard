import React from 'react';
import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterTasks } from '../features/tasks/tasksSlice';

const TaskFilters = () => {
  const dispatch = useDispatch();

  const handleFilter = (filter) => {
    dispatch(filterTasks(filter));  // Dispatch the filter action
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button variant="outlined" onClick={() => handleFilter('all')}>All Tasks</Button>
      <Button variant="outlined" onClick={() => handleFilter('completed')}>Completed Tasks</Button>
      <Button variant="outlined" onClick={() => handleFilter('pending')}>Pending Tasks</Button>
      <Button variant="outlined" onClick={() => handleFilter('overdue')}>Overdue Tasks</Button>
    </Box>
  );
};

export default TaskFilters;
