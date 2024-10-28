require = require('esm')(module /*, options*/);
module.exports = {
  // For npm run build:libs
  ...require('./dist/libs/skeleton/src'),
  ...require('./dist/libs/prisma/src'),
  // For Prisma Only
  // ...require('./dist/libs/prisma/prisma/src'),
  // ...require('./dist/libs/prisma/skeleton/src'),
};
