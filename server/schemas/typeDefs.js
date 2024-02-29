const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    unitNumber: int
    password: String
    phoneNumber: String
    tool: [Tool]!

  }

  type Tool {
    _id: ID
    toolText: String
    toolAuthor: String
    description:
    createdAt: String
    isAvailable: boolean 
    imgUrl: String!
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    tools(username: String): [Tool]
    tool(toolId: ID!): Tool
    unitNumber: [User]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(phoneNumber: String!, email: String!, password: String!): Auth
    addTool(toolText: String!): Tool
    addComment(toolId: ID!, commentText: String!): Tool
    removeTool(toolId: ID!): Tool
    removeComment(toolId: ID!, commentId: ID!): Tool
  }
`;

module.exports = typeDefs;
