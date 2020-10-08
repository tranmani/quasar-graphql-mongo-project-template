const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: Int!
    email: String!
    token: String!
  }

  type Person {
    id: Int!
    name: String!
    gender: String!
    height: Int!
    mass: Int!
    homeworld: String!
  }
  
  type Text {
    id: Int!
    text: String!
  }
`;