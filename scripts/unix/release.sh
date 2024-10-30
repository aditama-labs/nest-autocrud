npm run build:libs

# Copy package.json to plugins
cp package.json ./plugins
cp README.md ./plugins

# Change working directory to plugins
cd plugins

# Publish
npm publish