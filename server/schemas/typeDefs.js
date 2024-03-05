const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    unitNumber: String
    password: String
    phoneNumber: String
    notifiedAt: String
    tools: [Tool]

  }

  type Tool {
    _id: ID
    name: String
    description: String
    isAvailable: Boolean 
    imgUrl: String
  }

  type Board {
    _id: ID
    boardName: String
    posts: [Post]
  }
  
  type Post {
    _id: ID
    title: String
    postText: String
    postImg: String
    postAuthor: String
    datePosted: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    datePosted: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    tools: [Tool]
    tool(toolId: ID!): Tool
    unitNumber: [User]
    me: User
    posts: [Board]
    post(postId: ID!): Board
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, unitNumber: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(phoneNumber: String!, email: String!, password: String!): Auth
    addTool(toolText: String!): Tool
    removeTool(toolId: ID!): Tool
    removeComment(toolId: ID!, commentId: ID!): Tool
    addPost(title: String!, postText: String!, postImg: String, postAuthor: String!): Post
    addComment(postId: ID!, commentText: String!, commentAuthor: String!): Comment
  }
`;

module.exports = typeDefs;
