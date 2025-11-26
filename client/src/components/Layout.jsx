import { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Box, 
  useTheme, Avatar, Menu, MenuItem, Divider, ListItemIcon, Container 
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Logout from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useColorMode } from '../theme/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar with Glassmorphism */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: 'text.primary'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <DashboardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1
              }}
            >
              TASKMANAGER
            </Typography>

            {/* Right Side Icons */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <Box 
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ 
                  display: 'flex', alignItems: 'center', cursor: 'pointer',
                  p: 0.5, borderRadius: 2,
                  transition: '0.2s',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                 <Box sx={{ textAlign: 'right', mr: 1.5, display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" fontWeight="bold">
                    {user.username || 'Guest'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.role || 'User'}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.9rem' }}>
                  {user.username?.[0]?.toUpperCase()}
                </Avatar>
              </Box>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  minWidth: 180
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content Area */}
      <Container maxWidth="lg" component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      {/* Simple Footer */}
      <Box component="footer" sx={{ py: 3, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">
          © 2024 Task Manager App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};
export default Layout;