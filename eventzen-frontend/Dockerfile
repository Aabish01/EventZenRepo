# Use Node.js as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code and build the app
COPY . .
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy built app to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# ✅ Add custom nginx config to handle SPA routes
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the correct port (should be 80 for Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
