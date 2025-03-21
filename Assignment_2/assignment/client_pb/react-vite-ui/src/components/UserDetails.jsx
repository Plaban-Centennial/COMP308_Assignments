import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import './UserDetails.css'; // Import custom CSS for styling

// GraphQL query to fetch user details by ID
const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    user(id: $id) {
      id
      username
      email
      role
    }
  }
`;

// GraphQL mutation to update user details
const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails($id: ID!, $username: String!, $email: String!, $role: String!) {
    updateUser(id: $id, username: $username, email: $email, role: $role) {
      id
      username
      email
      role
    }
  }
`;

const UserDetails = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // React Router's navigation hook

  // Fetch user details using the ID
  const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { id },
  });

  // State to manage the editable fields
  const [editableUser, setEditableUser] = useState(null);

  // Initialize state when data is fetched
  useEffect(() => {
    if (data?.user) {
      setEditableUser(data.user);
    }
  }, [data]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };

  // Mutation to update user details
  const [updateUser] = useMutation(UPDATE_USER_DETAILS);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          id: editableUser.id,
          username: editableUser.username,
          email: editableUser.email,
          role: editableUser.role,
        },
      });
      alert('User details updated successfully');
    } catch (err) {
      console.error('Error updating user details:', err);
      alert('Failed to update user details. Please try again later.');
    }
  };

  // Handle loading and error states
  if (loading) return <p>Loading user details...</p>;
  if (error) {
    console.error('Error fetching user details:', error.message);
    return <p style={{ color: 'red' }}>Unable to fetch user details. Please try again later.</p>;
  }

  return (
    <div className="section">
      <h1>User Details</h1>
      {editableUser ? (
        <form onSubmit={handleSubmit}>
          <p>
            <strong>Username:</strong>
            <input
              type="text"
              name="username"
              value={editableUser.username}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={editableUser.email}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>Role:</strong>
            <select
              name="role"
              value={editableUser.role}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="Player">Player</option>
            </select>
          </p>
          <div className="form-group">
            <button type="submit">Update User</button>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate('/admin')}
            >
              Back to Admin Dashboard
            </button>
          </div>
        </form>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetails;