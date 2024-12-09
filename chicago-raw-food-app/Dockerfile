# Stage 1: Build the SvelteKit app
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the production version of the SvelteKit app
# Typically, you'd run `npm run build` with the appropriate adapter in svelte.config.js
RUN npm run build

# Stage 2: Final image
FROM node:18-alpine
WORKDIR /app

# Copy the build artifacts from the builder image
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port on which your SvelteKit app runs
EXPOSE 3000

# If you're using `adapter-node`, you may start your app with `node build`:
CMD ["node", "build"]