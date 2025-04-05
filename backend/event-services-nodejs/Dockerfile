# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
