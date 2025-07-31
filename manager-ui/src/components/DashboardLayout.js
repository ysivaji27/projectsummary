import React, { useEffect, useState } from 'react';
import {
  Drawer, List, ListItem, ListItemText, Toolbar,
  AppBar, Typography, Box, Button, Divider
} from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import ProjectModal from './ProjectModal';
import { useDispatch } from 'react-redux';
import { setSelectedProject } from '../features/projects/projectSlice';

const drawerWidth = 240;

const DashboardLayout = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Manager Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Left Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        
        {/* Add Project Button */}
        <Box sx={{ p: 2 }}>
          <Button fullWidth variant="outlined" onClick={() => setOpen(true)}>
            + Add Project
          </Button>
        </Box>
        <Divider />

        {/* Project List */}
        <List>
          {projects.map((proj) => (
            <ListItem
              key={proj.id}
              button
              onClick={() => {
                dispatch(setSelectedProject(proj)); // store in Redux
                navigate('/tasks'); // go to tasks page
              }}
            >
              <ListItemText primary={proj.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>

      {/* Add Project Modal */}
      <ProjectModal
        open={open}
        handleClose={() => setOpen(false)}
        onProjectAdded={fetchProjects}
      />
    </Box>
  );
};

export default DashboardLayout;
