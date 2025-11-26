import { Grid, Button, Pagination, Box, Typography, Paper, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import TaskFormDialog from '../components/TaskFormDialog';
import { useTheme } from '@mui/material/styles';
import config from '../config';

const Dashboard = () => {
  // Initialize as empty array []
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); // Add loading state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  const theme = useTheme();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Safety check: Redirect to login if no token
  if (!token) {
    window.location.href = '/login';
    return null;
  }

  const configHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.API_URL}/tasks?page=${page}`, configHeader);
      // SAFETY CHECK: Ensure we always set an array, even if API returns null
      setTasks(res.data.tasks || []); 
      setTotalPages(res.data.totalPages || 1);
    } catch (err) { 
      console.error("Failed to fetch tasks:", err);
      setTasks([]); // Fallback to empty on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [page]);

  const handleSave = async (taskData) => {
    try {
      if (currentTask) {
        await axios.put(`${config.API_URL}/tasks/${currentTask._id}`, taskData, configHeader);
      } else {
        await axios.post(`${config.API_URL}/tasks`, taskData, configHeader);
      }
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${config.API_URL}/tasks/${id}`, configHeader);
        fetchTasks();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <Box>
      {/* Welcome Banner */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, mb: 4, borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Hello, {user.username || 'User'}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            {/* FIX 1: Use safe navigation (?.) and fallback (|| 0) */}
            You have {tasks?.length || 0} tasks on this page. Let's get things done.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => { setCurrentTask(null); setOpen(true); }}
          sx={{ 
            bgcolor: 'white', color: 'primary.main', fontWeight: 'bold',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
          }}
        >
          Create New Task
        </Button>
      </Paper>

      {/* Loading State or Task Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* FIX 2: Ensure tasks is treated as an array */}
          {(tasks || []).map(task => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={task._id}>
              <TaskCard 
                task={task} 
                userRole={user?.role} 
                onEdit={(t) => { setCurrentTask(t); setOpen(true); }} 
                onDelete={handleDelete} 
              />
            </Grid>
          ))}
          
          {/* Empty State Message */}
          {!loading && tasks?.length === 0 && (
            <Grid item xs={12}>
              <Box textAlign="center" py={5} color="text.secondary">
                <Typography variant="h6">No tasks found.</Typography>
                <Typography variant="body2">Click "Create New Task" to get started.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={6}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(e, v) => setPage(v)} 
          color="primary" 
          size="large"
          shape="rounded"
        />
      </Box>

      <TaskFormDialog open={open} handleClose={() => setOpen(false)} task={currentTask} onSave={handleSave} />
    </Box>
  );
};

export default Dashboard;