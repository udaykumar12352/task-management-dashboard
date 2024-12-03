import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Button, Typography, CardActions, Box, TextField } from '@mui/material';
import { deleteTask, toggleComplete, reorderTasks } from '../features/tasks/tasksSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import Drag-and-Drop components
import ConfirmationDialog from './ConfirmationDialog';  // Modal for task deletion
import TaskEditForm from './TaskEditForm';  // For editing task details

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');  // State for the search query
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter tasks based on search and selected filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'completed') return task.completed && matchesSearch;
    if (filter === 'pending') return !task.completed && matchesSearch;
    if (filter === 'overdue') {
      return new Date(task.dueDate) < new Date() && matchesSearch; // Overdue tasks filter
    }
    return matchesSearch; // Show all tasks if no filter is applied
  });

  // Handle task deletion with confirmation dialog
  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
  };

  // Handle drag end (reorder tasks)
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return; // If dropped outside the list, do nothing
    if (destination.index === source.index) return; // If the task is dropped in the same position, do nothing
    dispatch(reorderTasks({ sourceIndex: source.index, destinationIndex: destination.index }));
  };

  return (
    <Box>
      {/* Search Bar */}
      <TextField
        label="Search Tasks"
        variant="outlined"
        value={searchQuery} // Binding the search query value
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on change
        fullWidth
        margin="normal"
      />

      {/* Drag-and-Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <Card
                      sx={{ mb: 2 }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardContent>
                        {editingTaskId === task.id ? (
                          <TaskEditForm task={task} setEditingTaskId={setEditingTaskId} />
                        ) : (
                          <>
                            <Typography variant="h6">{task.title}</Typography>
                            <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
                            </Typography>
                          </>
                        )}
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="outlined"
                          onClick={() => dispatch(toggleComplete(task.id))}
                          color={task.completed ? 'success' : 'primary'}
                        >
                          {task.completed ? 'Completed' : 'Mark as Complete'}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleDeleteClick(task.id)}
                          color="error"
                        >
                          Delete
                        </Button>
                        {editingTaskId !== task.id && (
                          <Button
                            variant="outlined"
                            onClick={() => handleEditClick(task)}
                            color="primary"
                          >
                            Edit
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openDialog}
        handleClose={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        taskId={taskToDelete}
      />
    </Box>
  );
};

export default TaskList;
