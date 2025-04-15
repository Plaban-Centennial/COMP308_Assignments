mutation CreateGameProgress($input: GameProgressInput!) {
    createGameProgress(input: $input) {
      _id
      userId
      level
      experiencePoints
      score
      rank
      achievements
      progress
      lastPlayed
      updatedAt
    }
  }
  
  {
    "input": {
      "userId": "67fe57f06e475e7fd9322420",
      "level": 5,
      "experiencePoints": 1000,
      "score": 500,
      "rank": 10,
      "achievements": ["First Win", "High Score"],
      "progress": "Level 5 - Midway",
      "lastPlayed": "2025-04-15T12:00:00Z"
    }
  }
  
  ---------------------------------------------------------------------------------------
  
  mutation UpdateGameProgress($id: ID!, $input: GameProgressInput!) {
      updateGameProgress(id: $id, input: $input) {
        _id
        userId
        level
        experiencePoints
        score
        rank
        achievements
        progress
        lastPlayed
        updatedAt
      }
    }
  
    {
      "id": "67fe66b5f0bfaa10ab5863c3",
      "input": {
        "userId": "67fe57f06e475e7fd9322420",
        "level": 6,
        "experiencePoints": 1200,
        "score": 600,
        "rank": 8,
        "achievements": ["First Win", "High Score", "Level Master"],
        "progress": "Level 6 - Boss Battle"
      }
    }
  
  --------------------------------------------------------------------------------------
  
    mutation DeleteGameProgress($id: ID!) {
      deleteGameProgress(id: $id)
    }
  
    {
      "id": "67fe66b5f0bfaa10ab5863c3"
    }
  
  --------------------------------------------------------------------------------------

query GetGameProgress($userId: ID!) {
  getGameProgress(userId: $userId) {
    _id
    userId
    level
    experiencePoints
    score
    rank
    achievements
    progress
    lastPlayed
    updatedAt
  }
}

{
  "userId": "67fe57f06e475e7fd9322420"
}

-------------------------------------------------------------------------------------

query GetAllGameProgress {
  getAllGameProgress {
    _id
    userId
    level
    experiencePoints
    score
    rank
    achievements
    progress
    lastPlayed
    updatedAt
  }
}

