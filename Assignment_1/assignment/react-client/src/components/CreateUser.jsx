
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

function CreateUser(props) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  });
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = "api/";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { ...user };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/show/' + result.data._id);
      }).catch((error) => {
        setShowLoading(false);
        console.error('Error creating user:', error);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Create New User
          </Typography>
        </Box>
        <Paper elevation={3}>
          <Box component="form" sx={{ p: 3 }} onSubmit={saveUser}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  value={user.firstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  fullWidth
                  value={user.lastName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  value={user.email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  value={user.username}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={user.password}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                {showLoading ? (
                  <CircularProgress />
                ) : (
                  <Button variant="contained" color="primary" type="submit">
                    Save
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

export default CreateUser;