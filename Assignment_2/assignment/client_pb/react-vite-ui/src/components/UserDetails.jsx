import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';

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

  // Fetch user details using the ID
  const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { id },
  });

  // State to manage the editable fields
  const [editableUser, setEditableUser] = useState(null);

  // Initialize state when data is fetched
  React.useEffect(() => {
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
    <div>
      <h1>User Details</h1>
      {editableUser ? (
        <form onSubmit={handleSubmit} style={{ padding: '10px', border: '1px solid #ccc', marginTop: '20px' }}>
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
          <button type="submit">Update User</button>
        </form>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetails;