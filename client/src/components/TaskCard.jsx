import { Card, CardContent, Typography, Button, Chip, Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TaskCard = ({ task, userRole, onEdit, onDelete }) => {
  const isCompleted = task.status === 'Completed';
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      {/* Status Strip on the left */}
      <Box 
        sx={{ 
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
          bgcolor: isCompleted ? 'success.main' : 'warning.main' 
        }} 
      />

      <CardContent sx={{ flexGrow: 1, pl: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.3 }}>
            {task.title}
          </Typography>
          <Chip 
            label={task.status} 
            size="small" 
            color={isCompleted ? 'success' : 'warning'}
            sx={{ fontWeight: 'bold', fontSize: '0.7rem', height: 24 }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {task.description || 'No description provided.'}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto" pt={2} borderTop="1px solid" borderColor="divider">
          <Box display="flex" alignItems="center" gap={0.5} color="text.disabled">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" fontWeight="500" lineHeight="normal">
              {formatDate(task.createdAt)}
            </Typography>
          </Box>

          <Box>
            <Tooltip title="Edit Task">
              <IconButton size="small" onClick={() => onEdit(task)} sx={{ color: 'primary.main' }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {userRole === 'admin' && (
              <Tooltip title="Delete Task">
                <IconButton size="small" onClick={() => onDelete(task._id)} sx={{ color: 'error.main', ml: 1 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;