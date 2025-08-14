import React, { useState } from 'react';
import api from "../api/axios"; 
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from '@mui/material';

const TaskModal = ({ open, handleClose, projectId, onTaskAdded }) => {
  const [task, setTask] = useState({
    title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: ''
  });

  const handleChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await api.put(`/tasks?projectId=${projectId}`, task);
    handleClose();
    onTaskAdded();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Description" name="description" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Due Date" name="dueDate" type="date" fullWidth margin="normal" onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField
          label="Priority"
          name="priority"
          select
          fullWidth
          margin="normal"
          defaultValue="MEDIUM"
          onChange={handleChange}
        >
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </TextField>
        <TextField
          label="Status"
          name="status"
          select
          fullWidth
          margin="normal"
          defaultValue="TODO"
          onChange={handleChange}
        >
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
