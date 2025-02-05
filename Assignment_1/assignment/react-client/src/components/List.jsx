import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, CircularProgress, Card, CardContent, CardHeader, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './Login';

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

function List(props) {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "api/users";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:', result.data);
          // Check if the user has logged in
          if (result.data.screen !== 'auth') {
            console.log('data in if:', result.data);
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error);
          setListError(true);
        });
    };
    fetchData();
  }, [apiUrl]);

  const showDetail = (id) => {
    navigate('/show/' + id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            User List
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
                data.map((item, idx) => (
                  <Card key={idx} sx={{ mb: 2 }}>
                    <CardHeader title={item.username} />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        {item.email}
                      </Typography>
                      <Button variant="contained" color="primary" onClick={() => showDetail(item._id)} sx={{ mt: 2 }}>
                        Show Details
                      </Button>
                    </CardContent>
                  </Card>
                ))
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

export default List;