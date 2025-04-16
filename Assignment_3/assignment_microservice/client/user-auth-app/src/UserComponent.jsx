// user-app/src/UserComponent.jsx
import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Alert, Button, Form, Container, Nav, Spinner } from 'react-bootstrap';

// GraphQL mutations and queries
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      username
      email
      role
    }
  }
`;

function UserComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, loading, error, refetch } = useQuery(CURRENT_USER_QUERY);

    const [login] = useMutation(LOGIN_MUTATION, {
        onCompleted: () => refetch(),
        onError: (error) => setAuthError(error.message || 'Login failed'),
    });

    const [register] = useMutation(REGISTER_MUTATION, {
        onCompleted: () => {
            alert("Registration successful! Please log in.");
            setActiveTab('login');
        },
        onError: (error) => setAuthError(error.message || 'Registration failed'),
    });

    const [logout] = useMutation(LOGOUT_MUTATION, {
        onCompleted: () => refetch(),
        onError: (error) => console.error(error.message || 'Logout failed'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setAuthError('');

        if (!username || !password || (activeTab === 'signup' && !email)) {
            setAuthError('All fields are required.');
            setIsSubmitting(false);
            return;
        }

        if (activeTab === 'login') {
            await login({ variables: { username, password } });
        } else {
            await register({ variables: { username, email, password } });
        }
        setIsSubmitting(false);
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

    const isLoggedIn = !!data?.currentUser;

    return (
        <Container className="p-5">
            {!isLoggedIn ? (
                <>
                    <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Nav.Item>
                            <Nav.Link eventKey="login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Form onSubmit={handleSubmit} className="mt-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        {activeTab === 'signup' && (
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        {authError && <Alert variant="danger">{authError}</Alert>}

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : activeTab === 'login' ? 'Login' : 'Sign Up'}
                        </Button>
                    </Form>
                </>
            ) : (
                <div className="text-center">
                    <h3>Welcome, {data.currentUser.username}!</h3>
                    <p>Email: {data.currentUser.email}</p>
                    <p>Role: {data.currentUser.role}</p>
                    <Button variant="danger" onClick={() => logout()}>Logout</Button>
                </div>
            )}
        </Container>
    );
}

export default UserComponent;
