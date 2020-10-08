const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    login(email: String!, password: String!) : User!
    person(id: Int!): Person
    allTestText: [Text]
    allXML: [XML]
  }

  type Mutation {
    createPerson(id: Int!, name: String!, gender: String!, height: Int!, mass: Int!, homeworld: String!): Person
    updatePerson(id: Int!, name: String!, gender: String!, height: Int!, mass: Int!, homeworld: String!): Person
    deletePerson(id: Int!): String

    testText(text: String!): Text

    createUser(email: String!, password: String!, confirm: String!) : User!
    verifyToken(token: String!): User!
    createXML(name: String!, xmin: Int!, ymin: Int!, xmax: Int!, ymax: Int!): XML!
  }

  type Subscription {
    newXML: XML
  }
`;