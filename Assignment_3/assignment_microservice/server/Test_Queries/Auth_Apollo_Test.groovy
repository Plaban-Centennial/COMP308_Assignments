mutation RegisterUser($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password)
}

{
  "username": "testUser",
  "email": "testuser@example.com",
  "password": "TestPassword123"
}

-----------------------------------------------------------------------------------

mutation LoginUser($username: String!, $password: String!) {
  login(username: $username, password: $password)
}

{
  "username": "testUser",
  "password": "TestPassword123"
}

------------------------------------------------------------------------------------

query CurrentUser {
  currentUser {
    username
    email
    role
    createdAt
  }
}

------------------------------------------------------------------------------------
mutation LogoutUser {
  logout
}