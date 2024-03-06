const { User, Tool, Board, Post } = require('../models');
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
    posts: async () => {
      return Post.find();
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, phoneNumber, unitNumber }) => {
      const user = await User.create({ username, email, password, phoneNumber, unitNumber });
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

    updateUser: async (parent, { id, phoneNumber, email, password }) => {
      const updatedUser = await User.findOneAndUpdate({ _id:id }, { phoneNumber, email, password }, {new:true});
      return updatedUser;
    },

    addTool: async (parent, { name, description, imgUrl }, context) => {
      if(name && description && imgUrl) {
        const tool = await Tool.create({
          name: name,
          description: description,
          imgUrl: imgUrl
        });

        if(context){

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tools: tool._id } }
        );

        return tool;
        }
      }
      throw AuthenticationError('You need to be logged in!');
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
    },

    sendEmail: async (parent, { unitNumber }) => {
      const user = await User.findOne({ unitNumber });

      if (!user) {
        throw AuthenticationError;
      }

      const email = user.email;
      const name = user.username;
      const quotedEmail = ""+email+"";
      console.log("Should be emailing unit# and email:");
      console.log(unitNumber);
      console.log(quotedEmail);
      console.log(name);

      const mailjet = new Mailjet({
        apiKey: process.env.MJ_APIKEY_PUBLIC, 
        apiSecret: process.env.MJ_APIKEY_PRIVATE 
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
                  "Email": quotedEmail,
                  "Name": name
                }
              ],
              "Subject": "Greetings",
              "TextPart": "My Mailjet email",
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
};

module.exports = resolvers;
