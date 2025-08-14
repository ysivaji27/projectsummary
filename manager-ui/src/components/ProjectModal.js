import React, { useState } from 'react';
import api from "../api/axios";

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const ProjectModal = ({ open, handleClose, onProjectAdded }) => {
  const [project, setProject] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await api.put(`/projects`,project);
    handleClose();
    onProjectAdded(); // callback to refresh list
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth margin="normal"
          label="Name" name="name" value={project.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth margin="normal"
          label="Description" name="description"
          value={project.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectModal;
