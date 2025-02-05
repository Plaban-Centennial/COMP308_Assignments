import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, CircularProgress, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff1744', // Red accent color
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          borderRadius: '10px',
        },
      },
    },
  },
});

function ShowUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = `/api/users/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(apiUrl);
        setUser(result.data);
        setShowLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setShowLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const editUser = (id) => {
    navigate(`/edit/${id}`);
  };

  const deleteUser = async (id) => {
    setShowLoading(true);
    try {
      await axios.delete(`/api/users/${id}`);
      setShowLoading(false);
      navigate('/list');
    } catch (error) {
      console.error('Error deleting user:', error);
      setShowLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            User Details
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Box sx={{ p: 3 }}>
            {showLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              user && (
                <Box>
                  <Typography variant="h6" component="h2">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Username: {user.username}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" onClick={() => editUser(user._id)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => deleteUser(user._id)}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              )
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default ShowUser;