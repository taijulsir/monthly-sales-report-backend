import { Request, Response } from 'express';

// Custom error interface
interface ErrorResponse extends Error {
    statusCode?: number;
    message: string;
}

const errorHandler = (err: ErrorResponse, req: Request, res: Response) => {
    const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
    const message = err.message || 'Internal Server Error'; // Default message if none is provided

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Only show stack trace in development
    });
};

export default errorHandler;
