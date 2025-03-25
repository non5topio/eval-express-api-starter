# Use Node.js 20 slim version
FROM node:20-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies, including dev dependencies
RUN npm install && npm install -g nodemon

# Copy the entire project
COPY . .

# Expose the port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=development
ENV PATH="/usr/src/app/node_modules/.bin:${PATH}"

# Start with nodemon
CMD ["nodemon", "src/index.js"]
