import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
import List from './components/List';
import EditUser from './components/EditUser';
import EditArticle from './components/EditArticle';
import CreateUser from './components/CreateUser';
import ShowUser from './components/ShowUser';
import ShowArticle from './components/ShowArticle';
import ListArticles from "./components/ListArticles";
import Home from './components/Home';
import Login from './components/Login';
import AddGame from './components/AddGame';
import ShowGame from './components/ShowGame';
import ListGames from './components/ListGames';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Game Library Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/create">Register</Nav.Link>
                <Nav.Link as={Link} to="/list">List of Users</Nav.Link>
                <Nav.Link as={Link} to="/listgames">Show Games Catalog</Nav.Link>
                <Nav.Link as={Link} to="/creategame">Add Game to Database</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container maxWidth="md">
          <Box sx={{ mt: 4, mb: 2 }}>
            <Paper elevation={3}>
              <Box sx={{ p: 3 }}>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="create" element={<CreateUser />} />
                  <Route path="login" element={<Login />} />
                  <Route path="list" element={<List />} />
                  <Route path="listarticles" element={<ListArticles />} />
                  <Route path="listgames" element={<ListGames />} />
                  <Route path="edit/:id" element={<EditUser />} />
                  <Route path="show/:id" element={<ShowUser />} />
                  <Route path="showarticle/:id" element={<ShowArticle />} />
                  <Route path="showgame/:id" element={<ShowGame />} />
                  <Route path="editarticle/:id" element={<EditArticle />} />
                  <Route path="creategame" element={<AddGame />} />
                  {/* <Route path="addgameforUser" element={<AddGameToUser />} /> */}
                </Routes>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;