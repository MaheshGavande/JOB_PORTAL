import mongoose from 'mongoose';
import 'dotenv/config';

const URL = process.env.MONGO_URI;

export const connectDB = async () => {
    if (!URL) {
        console.error('MONGO_URI is not set. Add it to your .env file (local) or your host\'s environment variables (production).');
        process.exit(1);
    }
    try {
        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};


