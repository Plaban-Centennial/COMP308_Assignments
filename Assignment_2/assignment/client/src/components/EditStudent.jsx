
// EditStudent component is used to edit a student record. 
// It uses the useQuery and useMutation hooks from Apollo Client 
// to fetch the student record and update the student record respectively. 
// The component uses the useParams and useNavigate hooks from 
// react-router-dom to get the id parameter from the URL and navigate
// to the student list page after updating the student record.
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Queries and Mutations
const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
      id
      firstName
      lastName
      email
      college
      program
      startingYear
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $firstName: String!, $lastName: String!, 
    $email: String!, $college: String!, $program: String!, $startingYear: Int!) {
    updateStudent(id: $id, firstName: $firstName, lastName: $lastName, 
        email: $email, college: $college, program: $program, startingYear: $startingYear) {
      id
      firstName
      lastName
      email
      college
      program
      startingYear
    }
  }
`;

const EditStudent = () => {
  let navigate = useNavigate();
  const { id } = useParams(); // Get the `id` parameter from the URL
  console.log('Editing Student ID:', id);

  // Fetch the student data
  const { loading, error, data } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      const { student } = data;
      setStudent({ ...student });
    },
  });

  // Define the mutation for updating the student
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  // State for student data
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    college: '',
    program: '',
    startingYear: 0,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: name === 'startingYear' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Updating Student:', student);

    try {
      await updateStudent({
        variables: { id, ...student },
      });
      navigate('/studentlist');
    } catch (mutationError) {
      console.error('Error updating student:', mutationError.message);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={student.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={student.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            value={student.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formCollege">
          <Form.Label>College</Form.Label>
          <Form.Control
            type="text"
            name="college"
            placeholder="Enter college"
            value={student.college}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formProgram">
          <Form.Label>Program</Form.Label>
          <Form.Control
            type="text"
            name="program"
            placeholder="Enter program"
            value={student.program}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formStartingYear">
          <Form.Label>Starting Year</Form.Label>
          <Form.Control
            type="number"
            name="startingYear"
            placeholder="Enter starting year"
            value={student.startingYear}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditStudent;
