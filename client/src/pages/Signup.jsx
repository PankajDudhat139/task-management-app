import React, { useState } from 'react';
import { 
  Container, Paper, TextField, Button, Typography, Box, Alert, 
  MenuItem, InputAdornment, useTheme 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import config from '../config';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.API_URL}/auth/register`, formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        p: 2
      }}
    >
      <Paper 
        elevation={10} 
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 450, 
          borderRadius: 4, 
          bgcolor: 'background.paper'
        }}
      >
        <Box textAlign="center" mb={3}>
           <Typography variant="h4" fontWeight="bold" color="primary">Create Account</Typography>
           <Typography variant="body2" color="text.secondary">Join us to manage your tasks efficiently</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <form onSubmit={handleSignup}>
          <Box display="flex" flexDirection="column" gap={2}>
            
            <TextField 
              name="username" 
              placeholder="Username" 
              fullWidth 
              variant="outlined"
              onChange={handleChange} 
              required 
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment>
              }}
            />

            <TextField 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              fullWidth 
              variant="outlined"
              onChange={handleChange} 
              required 
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon color="action" /></InputAdornment>
              }}
            />

            <TextField 
              name="password" 
              type="password" 
              placeholder="Password" 
              fullWidth 
              variant="outlined"
              onChange={handleChange} 
              required 
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon color="action" /></InputAdornment>
              }}
            />
            
            <TextField 
              select 
              name="role" 
              label="Select Role" 
              value={formData.role} 
              fullWidth 
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"><BadgeIcon color="action" /></InputAdornment>
              }}
            >
              <MenuItem value="user">Normal User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              size="large"
              startIcon={<HowToRegIcon />}
              sx={{ 
                mt: 1,
                py: 1.5, 
                borderRadius: 2, 
                fontWeight: 'bold', 
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
            >
              Sign Up
            </Button>
          </Box>

          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link to="/login" style={{ color: theme.palette.primary.main, fontWeight: 'bold', textDecoration: 'none' }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;