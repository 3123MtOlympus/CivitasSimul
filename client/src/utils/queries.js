import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_TOOLS = gql`
  query getTools {
    tools {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_TOOL = gql`
  query getSingleTool($toolId: ID!) {
    thought(toolId: $toolId) {
      _id
      toolText
      toolAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      tools {
        _id
        toolText
        toolAuthor
        createdAt
      }
    }
  }
`;
