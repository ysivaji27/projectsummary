import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Button, Box, Divider, Alert, Stack} from '@mui/material';
import TaskModal from '../components/TaskModal';
import TaskStatusPieChart from '../components/charts/TaskStatusPieChart';
import ActivityFeed from '../components/ActivityFeed';
import api from "../api/axios";

const Tasks = () => {
  const project = useSelector(state => state.project.selectedProject);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    if (!project) return;
    const res = await api.get(`/tasks?projectId=${project.id}`);
    setTasks(res.data);
  };

  // Fetch activity feed
  const fetchActivities = async () => {
    if (!project) return;
    const res = await api.get(`/activity?projectId=${project.id}`);
    setActivities(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchActivities();
  }, [project]);

  if (!project) return <Alert severity="info">Select a project to view tasks</Alert>;

  // Group tasks by status for Kanban
  const groupedTasks = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter(t => t.status === 'DONE')
  };

  // Prepare chart data
  const taskCounts = {
    todo: groupedTasks.TODO.length,
    inProgress: groupedTasks.IN_PROGRESS.length,
    done: groupedTasks.DONE.length
  };

  const updateTaskStatus = async (task, newStatus) => {
    await api.put(`/tasks/${task.id}`, {...task,status: newStatus });
    fetchTasks();
    fetchActivities();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* LEFT COLUMN - Kanban Board */}
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add Task
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {Object.keys(groupedTasks).map(status => (
            <Paper key={status} sx={{ flex: 1, p: 2 }}>
              <Typography variant="h6">{status.replace('_', ' ')}</Typography>
              <Divider sx={{ my: 1 }} />

       {groupedTasks[status].map(task => (
  <Paper
    key={task.id}
    sx={{ p: 1, mb: 1, bgcolor: '#f5f5f5' }}
    elevation={1}
  >
    <Typography variant="subtitle1">{task.title}</Typography>
    <Typography variant="body2" color="text.secondary">
      Priority: {task.priority}
    </Typography>

    {/* Action Buttons */}
    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
      {status !== 'IN_PROGRESS' && (
        <Button
          size="small"
          variant="outlined"
          onClick={() => updateTaskStatus(task, 'IN_PROGRESS')}
        >
          Start
        </Button>
      )}
      {status !== 'DONE' && (
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => updateTaskStatus(task, 'DONE')}
        >
          Mark Done
        </Button>
      )}
    </Stack>
  </Paper>
))}


            </Paper>
          ))}
        </Box>
      </Box>

      {/* RIGHT COLUMN - Chart + Activity */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Task Status Chart */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Task Status</Typography>
          <Divider sx={{ my: 1 }} />
          <TaskStatusPieChart data={taskCounts} />
        </Paper>

        {/* Activity Feed */}
        <ActivityFeed activities={activities} />
      </Box>

      {/* Add Task Modal */}
      <TaskModal
        open={open}
        handleClose={() => setOpen(false)}
        projectId={project.id}
        onTaskAdded={() => {
          fetchTasks();
          fetchActivities();
        }}
      />
    </Box>
  );
};

export default Tasks;
