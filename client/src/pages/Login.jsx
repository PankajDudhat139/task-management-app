import React, { useState } from 'react';
import { 
  Container, Paper, TextField, Button, Typography, Box, Alert, 
  InputAdornment, IconButton, useTheme 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
        p: 2
      }}
    >
      <Paper 
        elevation={10} 
        sx={{ 
          p: 5, 
          width: '100%', 
          maxWidth: 400, 
          borderRadius: 4, 
          textAlign: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 50, height: 50, borderRadius: '50%', 
              bgcolor: 'primary.main', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', mb: 2 
            }}
          >
            <LockIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h5" fontWeight="bold">Welcome Back</Typography>
          <Typography variant="body2" color="text.secondary">Please sign in to continue</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            placeholder="Email Address"
            variant="outlined"
            sx={{ mb: 2.5 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            required
          />
          
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            variant="outlined"
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />
          
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large"
            startIcon={<LoginIcon />}
            sx={{ 
              py: 1.5, 
              borderRadius: 2, 
              fontWeight: 'bold', 
              textTransform: 'none', 
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' 
            }}
          >
            Sign In
          </Button>
          
          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: theme.palette.primary.main, fontWeight: 'bold', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;