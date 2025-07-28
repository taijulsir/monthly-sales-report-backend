import mongoose from 'mongoose';
import chalk from 'chalk'; // Import chalk for styling console logs


const { connect } = mongoose;

async function connectDB() {
    try {
        // MongoDB URI from environment variables
        const conn = await connect(process.env.MONGO_URI as string);

        // Log the successful connection with the database host
        console.log(chalk.cyan.underline(`MongoDB Connected: ${conn.connection.host}`)); // Correct way to use underline
        
    } catch (error: unknown) {
        // If connection fails, log the error and exit the process
        if (error instanceof Error) {
            console.error(chalk.red(`Error: ${error.message}`));
        } else {
            console.error(chalk.red('An unknown error occurred'));
        }
        process.exit(1);
    }
}

export default connectDB;
