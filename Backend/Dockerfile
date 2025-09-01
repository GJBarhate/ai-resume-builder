# Use a specific and smaller Node.js version for reproducible builds
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Create a non-root user to run the application
# and give it ownership of the app directory
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser && \
    chown -R appuser:nodejs /app

# Switch to this user
USER appuser

# Copy only package.json and package-lock.json first (for better caching)
COPY --chown=appuser:nodejs package*.json ./

# Install only production dependencies
# npm ci is generally better for CI/CD environments
RUN npm install --omit=dev

# Now copy the rest of the application files
COPY --chown=appuser:nodejs . .

# Expose port
EXPOSE 5001

# Start the server
CMD ["node", "src/index.js"]
