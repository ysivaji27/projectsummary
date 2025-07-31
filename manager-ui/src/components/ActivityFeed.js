import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Divider } from '@mui/material';

const ActivityFeed = ({ activities }) => {
  return (
    <Paper sx={{ p: 2, mb: 2, maxHeight: 200, overflowY: 'auto' }}>
      <Typography variant="h6">Recent Activity</Typography>
      <Divider sx={{ my: 1 }} />
      <List dense>
        {activities.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No recent activity
          </Typography>
        )}
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`• ${activity.message}`}
              secondary={new Date(activity.timestamp).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ActivityFeed;
