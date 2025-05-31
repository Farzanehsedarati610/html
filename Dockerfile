# Use Node.js official image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (Render will map this)
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]

