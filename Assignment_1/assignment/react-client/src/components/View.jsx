import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddGame from './AddGame';
import ListGamesForUser from './ListGamesForUser';
import CreateArticle from './CreateArticle';
import ListArticles from './ListArticles';

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

function View(props) {
  const { screen, setScreen } = props;
  const [data, setData] = useState();
  const [articleOperation, setArticleOperation] = useState('no-op');
  const [gameOperation, setGameOperation] = useState('no-game-op');

  const deleteCookie = async () => {
    try {
      await axios.get('/api/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };

  const verifyCookie = async () => {
    try {
      const res = await axios.get('/api/welcome');
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const listArticles = (username) => {
    console.log('in listArticles: ', username);
  };

  const createArticle = () => {
    console.log('in createArticle');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Game Operations
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Box sx={{ p: 3 }}>
            {(() => {
              switch (gameOperation) {
                case 'list':
                  return <ListGamesForUser />;
                case 'create':
                  return <AddGame screen={screen} setScreen={setScreen} />;
                default:
                    return (
                    <Box sx={{ p: 4 }}>
                      <Typography variant="h4" component="p" color="primary">
                      {screen}
                      </Typography>
                      <Typography variant="h4" component="p" color="primary">
                      {data}
                      </Typography>
                      <Box sx={{ mt: 4, mb: 4 }}>
                      <Button variant="contained" color="primary" onClick={verifyCookie} sx={{ mr: 2 }}>
                      Verify Cookie
                      </Button>
                      <Button variant="contained" color="primary" onClick={() => setGameOperation('list')} sx={{ mr: 2 }}>
                      List Games
                      </Button>
                      <Button variant="contained" color="secondary" onClick={deleteCookie}>
                      Log out
                      </Button>
                      </Box>
                    </Box>
                    );
              }
            })()}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default View;