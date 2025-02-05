import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css';
import axios from 'axios';
import View from './View';

function App() {
  const [screen, setScreen] = useState('auth');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "/api/signin";

  const authenticateUser = async () => {
    console.log('calling auth');
    console.log(username);
    try {
      const loginData = { auth: { username, password } };
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth);
      console.log(res.data.screen);
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');
      const res = await axios.get('/api/read_cookie');
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      {screen === 'auth' ? (
        <div style={{ padding: '20px' }}>
          <Form>
            <Form.Group size="lg" style={{ marginBottom: '15px' }}>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                placeholder="Enter user name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" style={{ marginBottom: '15px' }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ textAlign: 'left' }}
              />
            </Form.Group>
            <Button
              size="lg"
              variant="primary"
              type="Button"
              onClick={authenticateUser}
              style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
            >
              LOGIN
            </Button>
          </Form>
        </div>
      ) : (
        <View screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}

export default App;