const db = require('../config/connection');
const { User, Tool } = require('../models');
const userSeeds = require('./userSeeds.json');
const toolSeeds = require('./toolSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Tool', 'tools');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    // for (let i = 0; i < toolSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Tool.create(toolSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
