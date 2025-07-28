import express, { Application } from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler'; // Import the error handler
import connectDB from './config/db';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
