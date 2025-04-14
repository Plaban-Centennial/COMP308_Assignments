const typeDefs = gql`
    # User type definition
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String!
    }

    # Auth payload for login/signup
    type AuthPayload {
        token: String!
        user: User!
    }

    # GameProgress type definition
    type GameProgress {
        id: ID!
        userId: ID!
        level: Int!
        experiencePoints: Int!
        score: Int!
        rank: Int
        achievements: [String]
        progress: String
        lastPlayed: String
        updatedAt: String
    }

    # Queries
    type Query {
        # Fetch all game progress for a user
        getGameProgress(userId: ID!): [GameProgress]

        # Fetch a specific game progress by ID
        getGameProgressById(id: ID!): GameProgress
    }

    # Mutations
    type Mutation {
        # User authentication
        signup(username: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        logout: Boolean

        # Game progress mutations
        createGameProgress(userId: ID!, level: Int, experiencePoints: Int, score: Int, progress: String): GameProgress
        updateGameProgress(id: ID!, level: Int, experiencePoints: Int, score: Int, progress: String): GameProgress
        deleteGameProgress(id: ID!): Boolean
    }
`;

module.exports = typeDefs;