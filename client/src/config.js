// client/src/config.js
const config = {
  // If we are in production, use the environment variable. 
  // If in development (local), use localhost.
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
};

export default config;