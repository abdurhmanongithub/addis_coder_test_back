import mongoose, { ConnectOptions } from 'mongoose';
import { environment } from './environment';

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(environment.databaseUrl, {
        } as ConnectOptions);
        mongoose.set('strictQuery', true)
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1); // Exit the process with an error code
    }
};

// Export the connection function
export default connectToDatabase;
