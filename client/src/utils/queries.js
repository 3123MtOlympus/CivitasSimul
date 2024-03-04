import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query users {
  users {
    _id
    username
    email
    unitNumber
    password
    phoneNumber
    notifiedAt
    tools {
      _id
      name
      description
      isAvailable
      imgUrl
    }
  }
}
`;

export const QUERY_TOOLS = gql`
query getTools {
  tools {
    _id
    name
    description
    isAvailable
    imgUrl
  }
}
`;

export const QUERY_SINGLE_TOOL = gql`
query getSingleTool($toolId: ID!) {
  tool(toolId: $toolId) {
    _id
    name
    description
    isAvailable
    imgUrl
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      unitNumber
      password
      phoneNumber
      notifiedAt
      tools {
        _id
        name
        description
        isAvailable
        imgUrl
      }
    }
  }
`;
