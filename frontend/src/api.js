// Uses the deployed API in production and the local API during development.
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default API_URL;
