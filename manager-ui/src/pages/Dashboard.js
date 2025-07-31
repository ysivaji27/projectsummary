import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import TaskStatusPieChart from '../components/charts/TaskStatusPieChart';
import ActivityFeed from '../components/ActivityFeed';

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadActivities = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/api/activity?page=${page}&size=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    const messages = data.content.map(item => `${item.username}: ${item.message}`);

    setActivities(prev => [...prev, ...messages]);
    setHasMore(!data.last); // check if more pages exist
  };

  useEffect(() => {
    loadActivities();
  }, [page]);

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box sx={{ flex: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <ActivityFeed activities={activities} />
        {hasMore && (
          <Button onClick={() => setPage(prev => prev + 1)} fullWidth>
            Load More
          </Button>
        )}
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6">Task Status</Typography>
          <TaskStatusPieChart data={{ todo: 2, inProgress: 3, done: 4 }} />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
