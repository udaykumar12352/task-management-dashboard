import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';

const DashboardLayout = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TaskForm />
            <TaskList />
          </Grid>
          <Grid item xs={12} md={4}>
            <TaskFilters />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardLayout;
