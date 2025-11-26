import { Container, Grid, Button, Pagination, Box, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import TaskFormDialog from '../components/TaskFormDialog';
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  const theme = useTheme();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks?page=${page}`, config);
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTasks(); }, [page]);

  const handleSave = async (taskData) => {
    try {
      if (currentTask) await axios.put(`http://localhost:5000/api/tasks/${currentTask._id}`, taskData, config);
      else await axios.post('http://localhost:5000/api/tasks', taskData, config);
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
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
            Hello, {user.username}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            You have {tasks.length} tasks on this page. Let's get things done.
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

      {/* Task Grid */}
      <Grid container spacing={3}>
        {tasks.map(task => (
          <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={task._id}>
            <TaskCard 
              task={task} 
              userRole={user?.role} 
              onEdit={(t) => { setCurrentTask(t); setOpen(true); }} 
              onDelete={handleDelete} 
            />
          </Grid>
        ))}
      </Grid>

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