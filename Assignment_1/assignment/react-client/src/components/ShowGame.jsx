import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

function ShowGame(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/games/" + id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from games', result.data);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, [apiUrl]);

  const editGame = (id) => {
    navigate('/editgame/' + id);
  };

  const removeGame = (id) => {
    axios.delete("/api/users/modifygameforUser/" + id).then((result) => {
      navigate('/listgames');
    }).catch((error) => {
      console.error('Error removing game:', error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Game Details
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Box sx={{ p: 3 }}>
            {showLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" component="h2">
                  {data.title}
                </Typography>
                <Typography variant="body1" component="p">
                  Genre: {data.genre}
                </Typography>
                <Typography variant="body1" component="p">
                  Platform: {data.platform}
                </Typography>
                <Typography variant="body1" component="p">
                  Release Year: {data.releaseYear}
                </Typography>
                <Typography variant="body1" component="p">
                  Developer: {data.developer}
                </Typography>
                <Typography variant="body1" component="p">
                  Rating: {data.rating}
                </Typography>
                <Typography variant="body1" component="p">
                  Description: {data.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  {/* <Button variant="contained" color="primary" onClick={() => editGame(data._id)}>
                    Edit
                  </Button> */}
                  <Button variant="contained" color="secondary" onClick={() => removeGame(data._id)}>
                    Delete
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default ShowGame;