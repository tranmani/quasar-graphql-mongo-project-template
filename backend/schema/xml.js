const { gql } = require('apollo-server-express');

module.exports = gql`
  type XML {
    id: Int!
    name: String!
    xmin: Int!
    ymin: Int!
    xmax: Int!
    ymax: Int!
  }
`;