# Use the official Node.js 20.11.1 image as the base image
FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /usr/app

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install --verbose

# Run tests
RUN npm test

RUN npm run build

# Expose port 3000 (assuming your application listens on port 3000)
EXPOSE 3000
