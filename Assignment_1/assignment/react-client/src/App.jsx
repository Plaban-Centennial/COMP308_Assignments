// filepath: /e:/College/Semester_6/COMP308_004_Emerging_Technologies/Assignments/Assignment_1/assignment/react-client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Box, Paper, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import List from './components/List';
import ListArticles from './components/ListArticles';
import ListGames from './components/ListGames';
import EditUser from './components/EditUser';
import ShowUser from './components/ShowUser';
import ShowArticle from './components/ShowArticle';
import ShowGame from './components/ShowGame';
import EditArticle from './components/EditArticle';
import AddGame from './components/AddGame';
import ThreeBackground from './components/ThreeBackground';
import theme from './theme';
import './App.css'; // Import the CSS file

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ThreeBackground />
        <div className="fullscreen-blur"></div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/home">Game Library Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
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

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Paper elevation={3} className="translucent-background">
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