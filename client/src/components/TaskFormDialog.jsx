import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, MenuItem, Box, Alert 
} from '@mui/material';
import { useState, useEffect } from 'react';

const TaskFormDialog = ({ open, handleClose, task, onSave }) => {
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    status: 'Pending' 
  });
  const [error, setError] = useState('');

  // Reset or Populate form when dialog opens
  useEffect(() => {
    if (task) {
      // Edit Mode
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status
      });
    } else {
      // Add Mode
      setFormData({ 
        title: '', 
        description: '', 
        status: 'Pending' 
      });
    }
    setError('');
  }, [task, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    onSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {task ? 'Edit Task' : 'Add New Task'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField 
              label="Title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              fullWidth 
              required 
              autoFocus
            />
            
            <TextField 
              label="Description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              fullWidth 
              multiline 
              rows={4} 
            />
            
            <TextField 
              select 
              label="Status" 
              name="status" 
              value={formData.status} 
              onChange={handleChange} 
              fullWidth
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained">
            {task ? 'Save Changes' : 'Create Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskFormDialog;