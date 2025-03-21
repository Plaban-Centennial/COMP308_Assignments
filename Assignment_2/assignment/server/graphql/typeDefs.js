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
    status: String!
    players: [Player!]
  }

type LoginResponse {
  id: ID!
  username: String!
  email: String!
  role: String!
  token: String!
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
    playerByUserId(userId: ID!): Player

    # Tournament queries
    tournaments: [Tournament]
    tournament(id: ID!): Tournament
    upcomingTournaments(status: String!): [Tournament]
  }

  # Mutation type definition
  type Mutation {
    # User mutations
    # login(username: String!, password: String!): User
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
    joinTournament(tournamentId: ID!, playerId: ID!): Tournament
    assignTournamentPlayers(tournamentId: ID!, playerIds: [ID!]!): Tournament  # New mutation to assign multiple players to a tournament

    login(username: String!, password: String!): LoginResponse!
  }
`;

module.exports = typeDefs;