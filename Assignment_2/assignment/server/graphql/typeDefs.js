// // typeDefs.js is a file that contains the GraphQL 
// // schema definition language (SDL) that defines the types, 
// // queries, and mutations that the GraphQL server supports. 
// // The schema is defined using the GraphQL schema definition 
// // language (SDL).
// const typeDefs = `#graphql
//   type Student {
//     id: ID!
//     firstName: String!
//     lastName: String!
//     email: String!
//     college: String!
//     program: String!
//     startingYear: Int!
//   }

//   type Query {
//     students: [Student]
//     student(id: ID!): Student
//   }

//   type Mutation {

//     addStudent(
//       firstName: String!
//       lastName: String!
//       email: String!
//       college: String!
//       program: String!
//       startingYear: Int!
//     ): Student

//     updateStudent(
//       id: ID!
//       firstName: String!
//       lastName: String!
//       email: String!
//       college: String!
//       program: String!
//       startingYear: Int!
//     ): Student

//     deleteStudent(id: ID!): Student

//     deleteStudentByEmail(email: String!): Student
//   }
// `;

// module.exports = typeDefs;
const typeDefs = `#graphql
  # User type definition
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
  }

  # Player type definition
  type Player {
    id: ID!
    user: User!
    ranking: Int!
    tournaments: [Tournament]
  }

  # Tournament type definition
  type Tournament {
    id: ID!
    name: String!
    game: String!
    date: String!
    players: [Player]
    status: String!
  }

  # Query type definition
  type Query {
    # User queries
    users: [User]
    user(id: ID!): User
    currentUser: User

    # Player queries
    players: [Player]
    player(id: ID!): Player

    # Tournament queries
    tournaments(status: String): [Tournament]
    tournament(id: ID!): Tournament
    
  }

  # Mutation type definition
  type Mutation {
    # User mutations
    login(username: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!, role: String!): User
    updateUser(id: ID!, username: String, email: String, password: String, role: String): User
    deleteUser(id: ID!): User

    # Player mutations
    addPlayer(userId: ID!, ranking: Int!, tournaments: [ID!]): Player
    updatePlayer(id: ID!, ranking: Int, tournaments: [ID!]): Player
    deletePlayer(id: ID!): Player

    # Tournament mutations
    addTournament(name: String!, game: String!, date: String!, players: [ID!], status: String!): Tournament
    updateTournament(id: ID!, name: String, game: String, date: String, players: [ID!], status: String): Tournament
    deleteTournament(id: ID!): Tournament
    joinTournament(tournamentId: ID!, userId: ID!): Tournament
  }
`;

module.exports = typeDefs;