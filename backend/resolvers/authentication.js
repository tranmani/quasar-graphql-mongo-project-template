const { UserInputError, PubSub } = require('apollo-server');
const pubsub = new PubSub();
const { createToken, verifyToken } = require('../utils/auth')
const bcrypt = require('bcrypt')
const User = require('../models/user');
const Text = require('../models/text');

module.exports = {
  Query: {
    async login(root, args, context) {
      const { email, password } = args;

      const user = await User.findOne({ email });
      if (!user) throw new Error('Email does not exist');

      const passwordIsValid = await bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) throw new Error('Password incorrect');

      return createToken(email, password);
    },

    async allTestText(parent, args, context) {
      // const { token } = context;
      // const _ = verifyToken(token)

      return await Text.find({});
    },
  },

  Mutation: {
    async testText(parent, args, context) {
      // const { token } = context;
      // const _ = verifyToken(token)

      const text = args.text;
      const text2 = new Text({
        text: text
      }, (err) => { if (err) throw err });

      text2.save();
      return { text };
    },

    async createUser(root, args, context) {
      const {
        email,
        password,
        confirm
      } = args

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists!');
      }

      if (password !== confirm) {
        throw new Error('Passwords are inconsistent!');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword
      }, (err) => { if (err) throw err });

      user.save();

      return createToken(email, password)
    },

    async verifyToken(root, args, context) {
      const { token } = args;
      return verifyToken(token);
    },
  },

  Subscription: {
  }
};