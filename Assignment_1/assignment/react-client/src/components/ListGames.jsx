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

function ListGames(props) {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = "api/api/games";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('<List>result.data:', result.data);
          // Check if the user has logged in
          if (result.data.screen !== 'auth') {
            console.log('data in if:', result.data);
            console.log('data state in if:', result.data.state);
            setData(result.data);
            setIsAuthenticated(isLoggedIn());
            setShowLoading(false);
          } else {
            setIsAuthenticated(false);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setIsAuthenticated(false);
          setShowLoading(false);
        });
    };
    fetchData();
  }, [apiUrl]);

  const addGame = (id) => {
    axios.post("/api/users/modifygameforUser/" + id).then((result) => {
      console.log('results from save game:', result.data);
      navigate('/showgame/' + id);
    }).catch((error) => setShowLoading(false));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Game List
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Box sx={{ p: 3 }}>
            {showLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              data.length !== 0 ? (
                <List>
                  {data.map((item, idx) => (
                    <ListItem key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <ListItemText primary={`${item.title} (${item.releaseYear})`} />
                      {isAuthenticated && (
                        <Button variant="contained" color="primary" onClick={() => addGame(item._id)}>
                          Add Game
                        </Button>
                      )}
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

export default ListGames;