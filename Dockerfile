FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install

# Copy the rest of the application files
COPY . ./

# Build the TypeScript code
RUN yarn run build

# Set the command to run the application
CMD ["yarn", "start"]