// typeDefs.js is a file that contains the GraphQL 
// schema definition language (SDL) that defines the types, 
// queries, and mutations that the GraphQL server supports. 
// The schema is defined using the GraphQL schema definition 
// language (SDL).
const typeDefs = `#graphql
  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    college: String!
    program: String!
    startingYear: Int!
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
  }

  type Mutation {
  
    addStudent(
      firstName: String!
      lastName: String!
      email: String!
      college: String!
      program: String!
      startingYear: Int!
    ): Student
    
    updateStudent(
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      college: String!
      program: String!
      startingYear: Int!
    ): Student
    
    deleteStudent(id: ID!): Student
    
    deleteStudentByEmail(email: String!): Student
  }
`;

module.exports = typeDefs;
