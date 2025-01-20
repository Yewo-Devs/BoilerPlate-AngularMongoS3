# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["node", "server.mjs"]
