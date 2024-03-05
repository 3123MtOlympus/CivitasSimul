const { User, Tool, Board } = require('../models');
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
    posts: async () => {
      return Board.find();
    },
    post: async (parent, { postId }) => {
      return Board.findOne({ _id: postId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, unitNumber }) => {
      const user = await User.create({ username, email, password, unitNumber });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw AuthenticationError
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw AuthenticationError
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
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
    addPost: async (parent, { title, postText, postImg, postAuthor}) => {
      return Post.create({ title, postText, postImg, postAuthor });
    },
    addComment: async (parent, { postId, commentText }) => {
      return Post.findOneAndUpdate ( 
        {_id: postId },
        { $addToSet : { comments: { commentText } }},
        { runValidators: true, new: true}
      )
    }
  },
};

module.exports = resolvers;
