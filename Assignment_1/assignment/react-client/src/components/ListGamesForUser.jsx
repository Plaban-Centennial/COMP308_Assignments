import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './Login';
import isLoggedIn from './LoginStatus';

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

function ListGamesForUser(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = "/api/api/games";

  useEffect(() => {
    const fetchData = async () => {
      axios.get("/api/users/me").then(result => {
        console.log('result.data:', result.data);
        if (result.data.screen !== 'auth') {
          console.log('data in if:', result.data);
          console.log('data state in if:', result.data.state);
          setData(result.data.games);
          setIsAuthenticated(isLoggedIn());
          setShowLoading(false);
        } else {
          setIsAuthenticated(false);
        }
      }).catch((error) => {
        console.log('error in fetchData:', error);
        setIsAuthenticated(false);
        setShowLoading(false);
      });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/showgame/' + id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Your Games
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Box sx={{ p: 3 }}>
            {showLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              isAuthenticated ? (
                <List>
                  {data.map((item, idx) => (
                    <ListItem key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <ListItemText primary={`${item.title} (${item.releaseYear})`} />
                      <Button variant="contained" color="primary" onClick={() => showDetail(item._id)}>
                        Show Details
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Login />
              )
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default ListGamesForUser;