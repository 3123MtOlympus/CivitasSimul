const { User, Tool } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

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
