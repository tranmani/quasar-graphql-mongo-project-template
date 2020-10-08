const { UserInputError, PubSub } = require('apollo-server');
const pubsub = new PubSub();
const User = require('../models/user');
const Text = require('../models/text');
const XML = require('../models/xml');

const XML_ADDED = 'XML_ADDED';

module.exports = {
  Query: {
    async allXML(parent, args, context) {
      // const { token } = context;
      // const _ = verifyToken(token)

      return await XML.find({});
    }
  },

  Mutation: {
    async createXML(parent, args, context) {
      // const { token } = context;
      // const _ = verifyToken(token)

      const {
        name,
        xmin,
        ymin,
        xmax,
        ymax
      } = args

      const xml = new XML({
        name,
        xmin,
        ymin,
        xmax,
        ymax
      }, (err) => { if (err) throw err });

      xml.save();
      pubsub.publish(XML_ADDED, { newXML: xml });

      return xml;
    },
  },

  Subscription: {
    newXML: {
      subscribe: () => pubsub.asyncIterator([XML_ADDED]),
    },
  }
}