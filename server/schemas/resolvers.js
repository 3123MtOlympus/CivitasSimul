const { User, Tool } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const Mailjet = require('node-mailjet');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('tools');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('tools');
    },
    tools: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Tool.find(params).sort({ createdAt: -1 });
    },
    tool: async (parent, { toolId }) => {
      return Tool.findOne({ _id: toolId });
    },
    me: async (parent, args, context) => {
      console.log("at me")
      console.log(context.user)
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('tools');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, phoneNumber, unitNumber }) => {
      const user = await User.create({ username, email, password, phoneNumber, unitNumber });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, { id, phoneNumber, email, password }) => {
      const updatedUser = await User.findOneAndUpdate({ _id:id }, { phoneNumber, email, password }, {new:true});
      return updatedUser;
    },

    addTool: async (parent, { toolText }, context) => {
      if (context.user) {
        const tool = await Tool.create({
          toolText,
          owner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tools: tool._id } }
        );

        return tool;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { toolId, commentText }, context) => {
      if (context.user) {
        return Tool.findOneAndUpdate(
          { _id: toolId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeTool: async (parent, { toolId }, context) => {
      if (context.user) {
        const tool = await Tool.findOneAndDelete({
          _id: toolId,
          toolAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tools: tool._id } }
        );

        return Tool;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { toolId, commentId }, context) => {
      if (context.user) {
        return Tool.findOneAndUpdate(
          { _id: toolId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    sendEmail: async (parent, { unitNumber }) => {
      const user = await User.findOne({ unitNumber });

      if (!user) {
        throw AuthenticationError;
      }

      const email = user.email;
      console.log("Should be emailing unit# and email:");
      console.log(unitNumber);
      console.log(email);

      const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC, //|| '0d3d2d0b4a2235f868be0fbc7ff03a84',
        apiSecret: process.env.MJ_APIKEY_PRIVATE //|| 'cb2611c841e8b331d6ae14d2a77f872c'
      });

      const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
          "Messages":[
            {
              "From": {
                "Email": "sofiaboubion@gmail.com",
                "Name": "NeighborLY"
              },
              "To": [
                {
                  "Email": "ariadnasv5@hotmail.com",
                  "Name": "Sofia"
                }
              ],
              "Subject": "Greetings",
              "TextPart": "My first Mailjet email",
              "HTMLPart": "<h3>Dear Neighbor, You have a package. </h3><br />May the delivery force be with you!",
            }
          ]
        })
        request
          .then((result) => {
            console.log(result.body)
          })
          .catch((err) => {
            console.log(err.statusCode)
          })


    },
  },

  notifyUser: async (parent, { unitNumber }) => {
    try {
        // Assuming User is your Mongoose model
        const user = await User.findOne({ unitNumber });
        
        // Assuming User is found and notification is sent successfully
        console.log('Thanks for being NeighborLY!');
        return 'Notification sent successfully';
    } catch (error) {
        // If there's an error in finding the user or sending notification
        console.error(error);
        throw new AuthenticationError('Failed to notify user');
    }
}
};

module.exports = resolvers;
