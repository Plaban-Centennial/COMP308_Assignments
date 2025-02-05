import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff1744', // Red accent color
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
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

function AddGame(props) {
  const [game, setGame] = useState({
    title: '',
    genre: '',
    platform: '',
    releaseYear: 1960,
    developer: '',
    rating: 5,
    description: ''
  });
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = "api/api/games";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const saveGame = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { ...game };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log('results from save game:', result.data);
        navigate('/showgame/' + result.data._id);
      }).catch((error) => {
        setShowLoading(false);
        console.error('Error saving game:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Add New Game
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Box component="form" sx={{ p: 3 }} onSubmit={saveGame}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Title"
                  name="title"
                  variant="outlined"
                  fullWidth
                  value={game.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Genre"
                  name="genre"
                  variant="outlined"
                  fullWidth
                  value={game.genre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Platform"
                  name="platform"
                  variant="outlined"
                  fullWidth
                  value={game.platform}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Release Year"
                  name="releaseYear"
                  variant="outlined"
                  fullWidth
                  value={game.releaseYear}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Developer"
                  name="developer"
                  variant="outlined"
                  fullWidth
                  value={game.developer}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rating"
                  name="rating"
                  variant="outlined"
                  fullWidth
                  value={game.rating}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={game.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                {showLoading ? (
                  <CircularProgress />
                ) : (
                  <Button variant="contained" color="primary" type="submit">
                    Save Game
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default AddGame;