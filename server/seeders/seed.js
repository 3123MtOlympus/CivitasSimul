const db = require('../config/connection');
const { User, Tool, Board, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const toolSeeds = require('./toolSeeds.json');
const boardSeeds = require('./boardSeeds.json');
const postSeeds = require('./postSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Tool', 'tools');

    await cleanDB('User', 'users');

    await cleanDB('Board', 'boards');

    await cleanDB('Post', 'posts');

    const users = await User.create(userSeeds);
    
    await Board.create(boardSeeds);

    await Post.create(postSeeds);

    for (let i = 0; i < toolSeeds.length; i++) {
      const { _id } = await Tool.create(toolSeeds[i]);
      const user = await User.findOneAndUpdate(
        { _id: users[Math.floor(Math.random()*users.length)]._id },
        {
          $addToSet: {
            tools: _id,
          },
        }
      );
    }
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
